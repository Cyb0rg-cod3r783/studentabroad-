
import firebase_admin
from firebase_admin import credentials, firestore
import os

def count_unis():
    try:
        service_account_path = "firebase-service-account.json"
        if not firebase_admin._apps:
            cred = credentials.Certificate(service_account_path)
            firebase_admin.initialize_app(cred)
        
        db = firestore.client()
        unis_ref = db.collection('universities')
        
        # Count documents
        count = 0
        docs = unis_ref.limit(1).stream()
        for doc in docs:
            print(f"Found a document: {doc.id}")
            print(f"Data snippet: {str(doc.to_dict())[:200]}")
            count += 1
            break
            
        print(f"Test query finished. Found: {count}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    count_unis()
