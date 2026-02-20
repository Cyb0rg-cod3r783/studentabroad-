
import os
import sys
import logging

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.data_pipeline.fetchers.wikidata_fetcher import WikidataFetcher
from services.data_pipeline.estimators.german_tuition_estimator import GermanTuitionEstimator

logging.basicConfig(level=logging.INFO)

def test_estimator():
    print("🇩🇪 Testing German Tuition Estimator...")
    
    fetcher = WikidataFetcher()
    estimator = GermanTuitionEstimator()
    
    # We want to specifically fetch Germany to test
    # But fetcher.fetch_all fetches all. 
    # Let's call _fetch_by_country directly for DE
    print("   Fetching real data from Wikidata (DE)...")
    data = fetcher._fetch_by_country('DE', 'Q183')
    
    print(f"   Fetched {len(data)} universities.")
    
    # Find specific examples
    examples = {
        'Heidelberg': False, # BW -> Should have fees
        'München': False,    # BY -> No high fees
        'Berlin': False      # BE -> No high fees
    }
    
    for uni in data:
        name = uni.get('name', '')
        state = uni.get('state', 'Unknown')
        
        # Apply estimation
        tuition = estimator.estimate_tuition(uni)
        uni.update(tuition if tuition else {})
        
        # Check against examples
        if 'Heidelberg' in name and not examples['Heidelberg']:
            print(f"\nUniversity: {name}")
            print(f"State: {state}")
            print(f"Tuition (Non-EU): {uni.get('tuition_undergraduate_non_eu_sem')}")
            examples['Heidelberg'] = True
            
        if 'Technische Universität München' in name and not examples['München']:
            print(f"\nUniversity: {name}")
            print(f"State: {state}")
            print(f"Tuition (Non-EU): {uni.get('tuition_undergraduate_non_eu_sem')}")
            examples['München'] = True

        if 'Freie Universität Berlin' in name and not examples['Berlin']:
            print(f"\nUniversity: {name}")
            print(f"State: {state}")
            print(f"Tuition (Non-EU): {uni.get('tuition_undergraduate_non_eu_sem')}")
            examples['Berlin'] = True
            
if __name__ == "__main__":
    test_estimator()
