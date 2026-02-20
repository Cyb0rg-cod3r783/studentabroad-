
import os
import sys
import logging
import argparse
from datetime import datetime
from dotenv import load_dotenv

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load env vars
load_dotenv()

from services.data_pipeline.fetchers.wikidata_fetcher import WikidataFetcher
from services.data_pipeline.ingestion_service import DataIngestionService
from services.firebase_university_service import FirebaseUniversityService

# Configure Logging
logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

from firebase_admin import credentials, initialize_app, firestore, get_app

def setup_firebase():
    try:
        get_app()
    except ValueError:
        # Initialize
        service_account_path = "firebase-service-account.json"
        cred_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), service_account_path)
        if os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            initialize_app(cred)
        else:
            logger.error(f"❌ Service account not found at: {cred_path}")
            sys.exit(1)

def run_automated_import(sources=None):
    """Run automated import from specified sources"""
    setup_firebase()
    
    if not sources:
        sources = ['wikidata']
        
    ingestion = DataIngestionService()
    
    # 1. Wikidata Import (Global + Germany Estimator)
    if 'wikidata' in sources:
        logger.info("🚀 Starting Wikidata Import...")
        fetcher = WikidataFetcher()
        data = fetcher.fetch_all()
        
        if data:
            logger.info(f"📥 Fetched {len(data)} universities from Wikidata")
            
            # Apply Estimators
            from services.data_pipeline.estimators.german_tuition_estimator import GermanTuitionEstimator
            from services.data_pipeline.estimators.canada_tuition_estimator import CanadaTuitionEstimator
            from services.data_pipeline.estimators.uk_tuition_estimator import UKTuitionEstimator
            
            de_estimator = GermanTuitionEstimator()
            ca_estimator = CanadaTuitionEstimator()
            uk_estimator = UKTuitionEstimator()
            
            logger.info("🌍 Applying Location-Based Tuition Estimates (DE, CA, UK)...")
            for uni in data:
                country = uni.get('country')
                if country == 'DE':
                    est = de_estimator.estimate_tuition(uni)
                    if est: uni.update(est)
                elif country == 'CA':
                    est = ca_estimator.estimate_tuition(uni)
                    if est: uni.update(est)
                elif country == 'GB':
                    est = uk_estimator.estimate_tuition(uni)
                    if est: uni.update(est)
            
            # Batch import
            start_year = datetime.now().year
            stats = ingestion.import_batch(data, "wikidata", start_year)
            
            logger.info("✅ Wikidata Import Complete")
            logger.info(f"   Created: {stats['created']}")
            logger.info(f"   Updated: {stats['updated']}")
            logger.info(f"   Skipped: {stats['skipped']}")
        else:
            logger.warning("⚠️ No data fetched from Wikidata")

    # 2. US College Scorecard Import
    if 'scorecard' in sources:
        from services.data_pipeline.fetchers.scorecard_fetcher import ScorecardFetcher
        logger.info("🚀 Starting US Scorecard Import...")
        fetcher = ScorecardFetcher()
        data = fetcher.fetch_all()
        
        if data:
            logger.info(f"📥 Fetched {len(data)} universities from Scorecard")
            start_year = datetime.now().year
            stats = ingestion.import_batch(data, "us_college_scorecard", start_year)
            logger.info("✅ Scorecard Import Complete")
        else:
            logger.info("ℹ️ Skipped Scorecard (Missing Key or Empty)")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Run Automated University Data Import')
    parser.add_argument('--sources', nargs='+', help='Sources to run (wikidata, scorecard)', default=['wikidata'])
    args = parser.parse_args()
    
    run_automated_import(args.sources)
