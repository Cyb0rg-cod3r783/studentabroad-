"""
Migration Script
Migrates initial data from `universities.json` to Firestore using the new DataIngestionService.
"""

import os
import sys
import json
import logging
from datetime import datetime

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from firebase_admin import credentials, firestore, initialize_app
from services.data_pipeline.ingestion_service import DataIngestionService

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def setup_firebase():
    """Initialize Firebase Admin SDK"""
    try:
        try:
            firestore.client()
            return
        except ValueError:
            pass

        service_account_path = "firebase-service-account.json"
        cred_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), service_account_path)
        
        if os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            initialize_app(cred)
            logger.info("✅ Firebase initialized")
        else:
            logger.error(f"❌ Service account not found at: {cred_path}")
            sys.exit(1)
            
    except Exception as e:
        logger.error(f"❌ Failed to initialize Firebase: {e}")
        sys.exit(1)

def load_legacy_data():
    """Load the existing universities.json"""
    json_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'universities.json')
    if not os.path.exists(json_path):
        logger.error(f"❌ File not found: {json_path}")
        return []
    
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def migrate():
    setup_firebase()
    raw_data = load_legacy_data()
    logger.info(f"📂 Loaded {len(raw_data)} universities from JSON")
    
    transformed_data = []
    
    for item in raw_data:
        # MAP LEGACY FIELDS TO NEW SCHEMA
        try:
            # Basic info
            uni = {
                "name": item.get('name'),
                # Convert country names to codes if necessary, or rely on validators strictness if they match
                # Legacy data has "USA", "UK", "Canada", "Germany"
                "country": item.get('country'), 
                "city": item.get('city', 'Unknown'), # Fallback
                "state": item.get('state'),
                "website": item.get('website'),
                "type": item.get('type', 'Public'),
                "established": item.get('foundedYear') or item.get('established'),
                
                # Metadata
                "current_ranking": int(item.get('ranking')) if item.get('ranking') else None,
                "current_ranking_source": "legacy_import",
                
                # Stats
                "student_population": int(item.get('totalStudents')) if item.get('totalStudents') else None,
                "international_students": int(item.get('internationalStudents')) if item.get('internationalStudents') else None,
                
                # Tuition (Handle structure)
                "tuition": {
                    "undergraduate_usd": item.get('tuitionFee'), # assuming this was ug
                    "currency": "USD"
                }
            }
            
            # Map countries just in case
            country_map = {"USA": "US", "UK": "GB", "United Kingdom": "GB", "United States": "US"}
            if uni["country"] in country_map:
                uni["country"] = country_map[uni["country"]]
                
            transformed_data.append(uni)
            
        except Exception as e:
            logger.warning(f"⚠️ Failed to transform {item.get('name')}: {e}")
            
    logger.info(f"🔄 Starting migration of {len(transformed_data)} valid records...")
    
    ingestion = DataIngestionService()
    stats = ingestion.import_batch(transformed_data, "legacy_migration", 2024)
    
    logger.info(f"✅ Migration Completed")
    logger.info(f"Stats: {json.dumps(stats, indent=2)}")

if __name__ == "__main__":
    migrate()
