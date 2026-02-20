
import os
import sys
import firebase_admin
from firebase_admin import credentials, firestore, initialize_app, get_app

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def verify_data():
    try:
        get_app()
    except ValueError:
        service_account_path = "firebase-service-account.json"
        cred_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), service_account_path)
        cred = credentials.Certificate(cred_path)
        initialize_app(cred)
        
    db = firestore.client()
    
    print("🇩🇪 Verifying German Tuition Data in Firestore...")
    
    # Check Heidelberg (should have high fees)
    # The slug for "Ruprecht-Karls-Universität Heidelberg" or similar might vary.
    # Let's search by country DE and name containing Heidelberg
    
    docs = db.collection('universities').where('country', '==', 'DE').stream()
    
    found_heidelberg = False
    
    for doc in docs:
        data = doc.to_dict()
        name = data.get('name', 'Unknown')
        
        if 'Heidelberg' in name or 'Ruprecht-Karls' in name:
            found_heidelberg = True
            print(f"\nUniversity: {name} (ID: {doc.id})")
            print("Full Data Snapshot:")
            import json
            from datetime import datetime
            def json_serial(obj):
                if isinstance(obj, datetime):
                    return obj.isoformat()
                raise TypeError ("Type %s not serializable" % type(obj))
            print(json.dumps(data, indent=2, default=json_serial))
            
            tuition = data.get('tuition', {})
            non_eu = tuition.get('undergraduate_non_eu_sem') or tuition.get('tuition_undergraduate_non_eu_sem')
            if non_eu:
                print(f"✅ Found Non-EU Tuition: {non_eu}")
            else:
                print("❌ Non-EU Tuition MISSING in expected fields")
                
            break
            
    if not found_heidelberg:
        print("⚠️ Heidelberg not found in database. Checking any DE uni...")
        # Check first DE uni
        docs = db.collection('universities').where('country', '==', 'DE').limit(1).stream()
        for doc in docs:
            data = doc.to_dict()
            print(f"\nRandom DE Uni: {data.get('name')}")
            print(f"Tuition: {data.get('tuition')}")

if __name__ == "__main__":
    verify_data()
