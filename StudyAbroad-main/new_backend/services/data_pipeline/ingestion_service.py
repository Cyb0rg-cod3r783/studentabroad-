"""
Data Ingestion Service
Handles ETL operations for University Data
"""

import logging
import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional
from firebase_admin import firestore
from .validators import UniversityIngestionSchema, TARGET_COUNTRIES

class DataIngestionService:
    """
    Service to handle data ingestion from various sources (CSV, JSON, Manual)
    into Firestore with validation and idempotent writes.
    """
    
    def __init__(self, db=None):
        self.db = db if db else firestore.client()
        self.logger = logging.getLogger(__name__)

    def import_batch(self, data: List[Dict[str, Any]], source_name: str, year: int) -> Dict[str, Any]:
        """
        Import a batch of university data.
        
        Args:
            data: List of university dictionaries
            source_name: Name of the data source (e.g., 'qs_world', 'manual_upload')
            year: Year of the data (relevant for rankings/stats)
            
        Returns:
            Dict with statistics of the import operation
        """
        stats = {
            'total': len(data),
            'processed': 0,
            'created': 0,
            'updated': 0,
            'skipped': 0,
            'errors': []
        }
        
        batch = self.db.batch()
        batch_count = 0
        BATCH_LIMIT = 400  # Firestore batch limit is 500, keeping safe margin
        
        for item in data:
            try:
                # 1. Basic Cleaning & Validation
                # Map CSV columns to schema fields
                if 'RANK_2025' in item:
                    try:
                        # Handle "10", "101-150", "10="
                        val = str(item['RANK_2025']).split('-')[0].split('=')[0].strip()
                        if val.isdigit():
                            item['current_ranking'] = int(val)
                    except:
                        pass
                elif 'rank' in item:
                    try:
                        val = str(item['rank']).split('-')[0].split('=')[0].strip()
                        if val.isdigit():
                            item['current_ranking'] = int(val)
                    except:
                        pass
                
                # --- Map Nested Data for Rich Schema ---
                
                # 1. Admission Requirements
                adm_keys = {
                    'min_cgpa': float, 'min_gre': int, 'min_gmat': int, 
                    'min_ielts': float, 'min_toefl': int, 'acceptance_rate': float
                }
                admission_data = {}
                for key, type_func in adm_keys.items():
                    # Check for direct key or various prefixes
                    val = item.get(key) or item.get(f"admission_{key}")
                    if val:
                        try:
                            admission_data[key] = type_func(val)
                        except (ValueError, TypeError):
                            pass
                if admission_data:
                    item['admission_requirements'] = admission_data

                # 2. Tuition Info
                tuition_keys = [
                    'undergraduate_usd', 'graduate_usd', 
                    'undergraduate_eu_sem', 'undergraduate_non_eu_sem', 
                    'graduate_eu_sem', 'graduate_non_eu_sem',
                    'undergraduate_international', 'graduate_international'
                ]
                tuition_data = {}
                for key in tuition_keys:
                    # Check for direct key, tuition_ prefixed key, or estimator specific key
                    val = item.get(key) or item.get(f"tuition_{key}")
                    if val is not None:
                        try:
                            # Handle potential string garbage
                            clean_val = str(val).replace(',', '').replace('$', '').replace('€', '').strip()
                            if clean_val:
                                tuition_data[key] = float(clean_val)
                        except (ValueError, TypeError):
                            pass
                
                # Copy note and currency if available
                if item.get('tuition_note'): tuition_data['note'] = item['tuition_note']
                if item.get('currency'): tuition_data['currency'] = item['currency']

                if tuition_data:
                    item['tuition'] = tuition_data
                    
                # 3. Stats & Degree Programs
                prog_keys = ['bachelors', 'masters', 'doctoral']
                prog_data = {}
                for key in prog_keys:
                    val = item.get(key) or item.get(f"programs_{key}")
                    if val: 
                        try: prog_data[key] = int(val)
                        except: pass
                if prog_data:
                    item['degree_programs'] = prog_data
                    
                # 4. Living Costs
                cost_keys = ['accommodation', 'groceries', 'transport']
                cost_data = {}
                for key in cost_keys:
                    val = item.get(key) or item.get(f"cost_{key}")
                    if val: cost_data[key] = str(val)
                if cost_data:
                    item['living_costs'] = cost_data

                # ---------------------------------------

                if 'country' not in item or item['country'] not in TARGET_COUNTRIES:
                    # Try to map common names
                    c = item.get('country', item.get('location')) # 'location' sometimes used
                    if c == 'United Kingdom': item['country'] = 'GB'
                    elif c == 'United States': item['country'] = 'US'
                    elif c == 'Canada': item['country'] = 'CA'
                    elif c == 'Germany': item['country'] = 'DE'
                    
                    if item.get('country') == 'USA': item['country'] = 'US'
                    if item.get('country') == 'UK': item['country'] = 'GB'
                
                # Pydantic Validation
                try:
                    university = UniversityIngestionSchema(**item)
                except ValueError as ve:
                    stats['skipped'] += 1
                    stats['errors'].append(f"Validation error for {item.get('name', 'Unknown')}: {str(ve)}")
                    continue
                
                # 2. Logic to find existing document or create new ID
                # We prioritize matching by Name + Country
                doc_id = self._generate_doc_id(university.name, university.country)
                doc_ref = self.db.collection('universities').document(doc_id)
                
                # Check existence (In a real batch process, you might optimize likely-exists checks)
                # For safety, we can do a transactional check or just overwrite merged fields
                # Here we blindly set with merge=True for static data, which acts as create/update
                
                uni_dict = university.dict(exclude_unset=True)
                # Remove nested objects that go to subcollections or special handling
                # Keep static metadata
                
                # Add timestamps
                uni_dict['updated_at'] = datetime.utcnow()
                if 'rankings' in uni_dict: del uni_dict['rankings'] # Handle separately
                
                batch.set(doc_ref, uni_dict, merge=True)
                
                # 3. Handle Rankings Subcollection
                if university.current_ranking:
                    ranking_ref = doc_ref.collection('rankings').document(str(year))
                    ranking_data = {
                        'year': year,
                        'rank': university.current_ranking,
                        'source': source_name,
                        'updated_at': datetime.utcnow()
                    }
                    batch.set(ranking_ref, ranking_data, merge=True)

                stats['processed'] += 1
                batch_count += 1
                
                # Commit if limit reached
                if batch_count >= BATCH_LIMIT:
                    batch.commit()
                    batch = self.db.batch()
                    batch_count = 0
                    
            except Exception as e:
                stats['errors'].append(f"Error processing {item.get('name')}: {str(e)}")
        
        # Final commit
        if batch_count > 0:
            batch.commit()
            
        self._log_import(source_name, year, stats)
        return stats
    def _generate_doc_id(self, name: str, country: str) -> str:
        """Generate a consistent URL-safe slug for the document ID"""
        # Simple slugification: "Massachusetts Institute of Technology" -> "us-massachusetts-institute-of-technology"
        # This allows idempotent ID generation without lookup
        
        slug = name.lower().strip()
        slug = ''.join(c if c.isalnum() else '-' for c in slug)
        while '--' in slug:
            slug = slug.replace('--', '-')
        slug = slug.strip('-')
        
        return f"{country.lower()}-{slug}"
    
    def _log_import(self, source: str, year: int, stats: Dict):
        """Log import operation to Firestore"""
        try:
            self.db.collection('import_logs').add({
                'source': source,
                'year': year,
                'timestamp': datetime.utcnow(),
                'stats': stats
            })
        except Exception as e:
            print(f"Failed to log import: {e}")
