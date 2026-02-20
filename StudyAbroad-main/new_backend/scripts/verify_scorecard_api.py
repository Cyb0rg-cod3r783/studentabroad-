
import os
import sys
import logging
from dotenv import load_dotenv

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.data_pipeline.fetchers.scorecard_fetcher import ScorecardFetcher

# Load .env
load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def verify_scorecard_connection():
    api_key = os.getenv('COLLEGE_SCORECARD_API_KEY')
    print(f"🔑 Creating verification for API Key: {'*' * 5}{api_key[-4:] if api_key and len(api_key)>4 else 'NOT FOUND'}")
    
    if not api_key or "PLACEHOLDER" in api_key:
        print("❌ Error: API Key not found or is still generic placeholder.")
        print("   Please set COLLEGE_SCORECARD_API_KEY in your .env file or environment.")
        return

    print("📡 Contacting US Dept of Education API...")
    fetcher = ScorecardFetcher()
    
    # Try fetching just 1 record to verify auth
    try:
        data = fetcher.fetch_all(limit=1)
        
        if data:
            print(f"✅ Success! Fetched data for: {data[0].get('name')}")
            print("   Connection is working.")
        else:
            print("⚠️ Connected but returned no data (possibly filter mismatch or empty db?)")
            
    except Exception as e:
        print(f"❌ Connection Failed: {e}")

if __name__ == "__main__":
    verify_scorecard_connection()
