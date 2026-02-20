"""
Import Data Script
CLI tool to import university data from CSV/JSON files in `data/imports/` directory.
"""

import os
import sys
import time
import shutil
import logging
import json
import csv
import io
from datetime import datetime

# Add parent directory to path to import services
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from firebase_admin import credentials, firestore, initialize_app
from services.data_pipeline.ingestion_service import DataIngestionService

# Configure Logging
logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("import.log", encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Constants
IMPORTS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'imports')
PROCESSED_DIR = os.path.join(IMPORTS_DIR, 'processed')

def setup_firebase():
    """Initialize Firebase Admin SDK"""
    try:
        # Check if already initialized
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
            logger.info("✅ Firebase initialized successfully")
        else:
            logger.error(f"❌ Service account not found at: {cred_path}")
            sys.exit(1)
            
    except Exception as e:
        logger.error(f"❌ Failed to initialize Firebase: {e}")
        sys.exit(1)

def process_file(file_path):
    """Process a single file"""
    filename = os.path.basename(file_path)
    logger.info(f"📂 Processing file: {filename}")
    
    ingestion_service = DataIngestionService()
    
    try:
        # Determine source and year from filename or default
        # Expected format: source_year.csv (e.g., qs_2025.csv)
        parts = os.path.splitext(filename)[0].split('_')
        year = datetime.now().year
        source = "manual_upload"
        
        # Try to extract year if last part is 4 digits
        if len(parts) > 1 and parts[-1].isdigit() and len(parts[-1]) == 4:
            year = int(parts[-1])
            source = "_".join(parts[:-1])
        else:
            source = os.path.splitext(filename)[0]

        logger.info(f"ℹ️  Detected Source: {source}, Year: {year}")

        # Read File
        data = []
        if filename.endswith('.json'):
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
        elif filename.endswith('.csv'):
            # Try to handle multiple encodings
            encodings = ['utf-8', 'latin-1', 'cp1252']
            content = None
            
            for enc in encodings:
                try:
                    with open(file_path, 'r', encoding=enc) as f:
                        content = f.read()
                    break
                except UnicodeDecodeError:
                    continue
            
            if content is None:
                logger.error(f"❌ Failed to decode file {filename} with any supported encoding")
                return False

            # Handle CSV
            csv_reader = csv.DictReader(io.StringIO(content))
            data = [row for row in csv_reader]
        else:
            logger.warning(f"⚠️  Skipping unsupported file type: {filename}")
            return False

        if not data:
            logger.warning(f"⚠️  File is empty: {filename}")
            return False

        # Run Ingestion
        logger.info(f"🔄 Starting ingestion for {len(data)} records...")
        stats = ingestion_service.import_batch(data, source, year)
        
        # Log Stats
        logger.info("✅ Import Completed")
        logger.info(f"   Created: {stats['created']}")
        logger.info(f"   Updated: {stats['updated']}")
        logger.info(f"   Skipped: {stats['skipped']}")
        if stats['errors']:
            logger.error(f"   ❌ Errors ({len(stats['errors'])}):")
            for err in stats['errors'][:5]: # Show first 5 errors
                logger.error(f"      - {err}")
            if len(stats['errors']) > 5:
                logger.error(f"      - ... and {len(stats['errors']) - 5} more")

        return True

    except Exception as e:
        logger.error(f"❌ Error processing {filename}: {e}")
        return False

def main():
    """Main loop"""
    setup_firebase()
    
    # Check for files
    
    if not os.path.exists(IMPORTS_DIR):
        os.makedirs(IMPORTS_DIR)
    
    if not os.path.exists(PROCESSED_DIR):
        os.makedirs(PROCESSED_DIR)
        
    logger.info(f"👀 Watching directory: {IMPORTS_DIR}")
    files = os.listdir(IMPORTS_DIR)
    logger.info(f"found files: {files}")

    file_found = False
    
    for filename in files:
        file_path = os.path.join(IMPORTS_DIR, filename)
        
        # Case insensitive check
        if os.path.isfile(file_path):
            if filename.lower() in ['.gitkeep', 'readme.txt', 'import.log']:
                continue
                
            file_found = True
            logger.info(f"🚀 Found candidate: {filename}")
            success = process_file(file_path)
            
            # Move to processed
            if success:
                target_path = os.path.join(PROCESSED_DIR, f"{int(time.time())}_{filename}")
                shutil.move(file_path, target_path)
                logger.info(f"📦 Moved {filename} to processed/")
            else:
                 logger.warning(f"❌ Failed to process {filename}, leaving in imports/")

    if not file_found:
        logger.info("📭 No new files found to import.")

if __name__ == "__main__":
    main()
