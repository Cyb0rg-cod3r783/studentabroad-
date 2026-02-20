
import os
import sys
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app, get_app
import json
from datetime import datetime

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def json_serial(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

def verify_all():
    try:
        get_app()
    except ValueError:
        service_account_path = "firebase-service-account.json"
        cred_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), service_account_path)
        cred = credentials.Certificate(cred_path)
        initialize_app(cred)
        
    db = firestore.client()
    
    print("🌍 Verifying Global University Data in Firestore...")
    
    # Target universities to check
    targets = [
        {"country": "US", "search": "Massachusetts Institute of Technology"},
        {"country": "CA", "search": "University of Toronto"},
        {"country": "GB", "search": "University of Oxford"},
        {"country": "DE", "search": "Heidelberg"}
    ]
    
    for target in targets:
        print(f"\n--- Checking {target['country']}: {target['search']} ---")
        print(f"DEBUG: Querying collection('universities').where('country', '==', '{target['country']}')")
        query = db.collection('universities').where('country', '==', target['country'])
        print("DEBUG: Executing stream()...")
        docs = query.stream()
        print("DEBUG: Stream opened. Iterating...")
        
        found = False
        for doc in docs:
            print(f"DEBUG: Processing doc: {doc.id}")
            data = doc.to_dict()
            if target['search'].lower() in data.get('name', '').lower():
                found = True
                print(f"✅ Found: {data.get('name')} (ID: {doc.id})")
                print(f"   Location: {data.get('city')}, {data.get('state') or 'N/A'}")
                print(f"   Tuition Object: {json.dumps(data.get('tuition'), indent=2, default=json_serial)}")
                
                # Check for key fields
                tuition = data.get('tuition', {})
                if target['country'] == 'US':
                    if tuition.get('undergraduate_usd'): print("   ✅ Has US Scorecard Tuition")
                elif target['country'] in ['CA', 'GB', 'DE']:
                    if tuition.get('undergraduate_international') or tuition.get('undergraduate_non_eu_sem'):
                        print(f"   ✅ Has {target['country']} Estimated Tuition")
                    else:
                        print(f"   ❌ Missing {target['country']} Estimated Tuition")
                break
        
        if not found:
            print(f"❌ Could not find target university for {target['country']}")

if __name__ == "__main__":
    verify_all()
