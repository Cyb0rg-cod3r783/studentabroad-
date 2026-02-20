
import os
import sys
import logging
import json

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.data_pipeline.fetchers.wikidata_fetcher import WikidataFetcher
from services.data_pipeline.estimators.german_tuition_estimator import GermanTuitionEstimator
from services.data_pipeline.validators import UniversityIngestionSchema
from services.data_pipeline.ingestion_service import DataIngestionService

logging.basicConfig(level=logging.INFO)

def debug_pipeline():
    print("🔍 Debugging Heidelberg Pipeline...")
    
    # 1. Fetch
    fetcher = WikidataFetcher()
    # Mocking _fetch_by_country to filter for Heidelberg only in the "parse" stage 
    # (Checking if fetcher logic produces it)
    print("   Fetching from Wikidata (DE)...")
    data = fetcher._fetch_by_country('DE', 'Q183')
    
    print(f"Total fetched: {len(data)}")
    for d in data[:10]:
        print(f" - {d.get('name')}")
        
    target = None
    for uni in data:
        if 'Heidelberg' in uni.get('name', '') or 'Ruprecht' in uni.get('name', ''):
            print(f"   Potential Match: {uni.get('name')} (State: {uni.get('state')})")
            if 'Ruprecht' in uni.get('name', '') or 'Heidelberg University' in uni.get('name', ''):
                target = uni
                # Don't break immediately, let's see what else there is
                
    if not target:
        print("❌ Heidelberg not found in Wikidata results!")
        return
        
    print(f"✅ Found: {target['name']}")
    print(f"   State (Fetcher): {target.get('state')}")
    
    # 2. Estimator
    estimator = GermanTuitionEstimator()
    est = estimator.estimate_tuition(target)
    print(f"   Estimator Result: {est}")
    
    if est:
        target.update(est)
        
    # 3. Ingestion Service Mapping Simulation
    # Copying logic from ingestion_service.py around line 88
    item = target.copy()
    
    tuition_keys = ['undergraduate_usd', 'graduate_usd', 'undergraduate_eu_sem', 'undergraduate_non_eu_sem', 'graduate_eu_sem', 'graduate_non_eu_sem']
    tuition_data = {}
    for key in tuition_keys:
        val = item.get(key) or item.get(f"tuition_{key}")
        if val:
            tuition_data[key] = float(str(val).replace(',', '').replace('$', ''))
    
    if tuition_data:
        item['tuition'] = tuition_data
        
    print(f"   Mapped Tuition: {item.get('tuition')}")
    
    # 4. Validation
    try:
        schema = UniversityIngestionSchema(**item)
        print("✅ Validation Success!")
        output = schema.dict(exclude_unset=True)
        print(f"   Final Output State: {output.get('state')}")
        print(f"   Final Output Tuition: {output.get('tuition')}")
    except Exception as e:
        print(f"❌ Validation Failed: {e}")

if __name__ == "__main__":
    debug_pipeline()
