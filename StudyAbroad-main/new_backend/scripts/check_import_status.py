
import os
import sys
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app, get_app

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def check_logs():
    try:
        get_app()
    except ValueError:
        service_account_path = "firebase-service-account.json"
        cred_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), service_account_path)
        cred = credentials.Certificate(cred_path)
        initialize_app(cred)
        
    db = firestore.client()
    
    print("🔍 Checking Import Logs...")
    logs = db.collection('import_logs').order_by('timestamp', direction=firestore.Query.DESCENDING).limit(1).stream()
    
    found = False
    for log in logs:
        found = True
        data = log.to_dict()
        print(f"📅 Date: {data.get('timestamp')}")
        print(f"📦 Source: {data.get('source')}")
        stats = data.get('stats', {})
        print(f"📊 Stats: {stats}")
        if stats.get('errors'):
            print("❌ Errors found:")
            for err in stats['errors'][:10]: # Print first 10
                print(f"   - {err}")
        
    if not found:
        print("❌ No logs found.")
        
    # Check total count
    print("🔢 Counting Universities...")
    # Note: count() aggregation is better but aggregate_query is needed.
    # For now, just a quick check of a few docs to see provided data
    docs = db.collection('universities').limit(5).stream()
    count = 0
    for d in docs:
        count += 1
        print(f"   - Found: {d.id} ({d.get('name')})")
    
    if count > 0:
        print(f"✅ Data exists in 'universities' collection (showing first {count})")
    else:
        print("❌ 'universities' collection appears empty")

if __name__ == "__main__":
    check_logs()
