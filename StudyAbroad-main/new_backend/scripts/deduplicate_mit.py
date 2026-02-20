import os
import sys

# Add parent directory to path to import services
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from firebase_admin import credentials, firestore, initialize_app

def setup_firebase():
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
            print("✅ Firebase initialized")
        else:
            print(f"❌ Service account not found at: {cred_path}")
            sys.exit(1)
    except Exception as e:
        print(f"❌ Failed to initialize Firebase: {e}")
        sys.exit(1)

def deduplicate():
    setup_firebase()
    db = firestore.client()
    
    # Based on the debug output we expect to see
    # ID A: massachusetts-institute-of-technology (Legacy? or CSV?)
    # ID B: us-massachusetts-institute-of-technology (Correct one with US- prefix)
    
    # Check for the bad one (assuming one is missing the country code prefix or has wrong country code)
    # The migration script might have created one without country prefix if country was missing?
    # Or maybe 'united-states-...' vs 'us-...'
    
    # Let's clean up broadly. 
    # Strategy: 
    # 1. Get all documents matching "Massachusetts Institute of Technology"
    # 2. Keep the one that follows the schema "us-<slug>" and has ranking data.
    
    print("Searching for MIT records (broad scan)...")
    docs = db.collection('universities').stream()
    
    records = []
    for doc in docs:
        data = doc.to_dict()
        name = data.get('name', '')
        if "Massachusetts Institute of Technology" in name:
            records.append({'id': doc.id, 'data': data})
        
    print(f"Found {len(records)} records.")
    
    if len(records) < 2:
        print("No duplicates found to delete.")
        return

    # Identify the 'good' one (Preferred: starts with 'us-', has ranking)
    better_record = None
    for rec in records:
        print(f"Checking: {rec['id']}")
        if rec['id'].startswith('us-') and rec['data'].get('ranking'):
             better_record = rec
             break
             
    # If no preferred one found, pick the first one with ranking
    if not better_record:
        for rec in records:
             if rec['data'].get('ranking'):
                 better_record = rec
                 break
    
    if not better_record:
        print("No record has ranking data. Keeping the one with 'us-' prefix.")
        for rec in records:
            if rec['id'].startswith('us-'):
                better_record = rec
                break

    if better_record:
        print(f"✅ Keeping: {better_record['id']}")
        
        for rec in records:
            if rec['id'] != better_record['id']:
                print(f"🗑️ Deleting duplicate: {rec['id']}")
                db.collection('universities').document(rec['id']).delete()
    else:
        print("Could not determine which record to keep.")

if __name__ == "__main__":
    deduplicate()
