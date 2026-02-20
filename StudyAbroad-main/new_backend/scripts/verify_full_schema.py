import os
import sys
import json
from datetime import datetime

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.data_pipeline.ingestion_service import DataIngestionService
from services.firebase_university_service import FirebaseUniversityService

from firebase_admin import credentials, initialize_app, firestore, get_app

def setup_firebase():
    try:
        get_app()
        print("✅ Firebase already initialized")
    except ValueError:
        # Initialize
        service_account_path = "firebase-service-account.json"
        cred_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), service_account_path)
        if os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            initialize_app(cred)
            print("✅ Firebase initialized")
        else:
            print(f"❌ Service account not found at: {cred_path}")
            sys.exit(1)

def test_rich_data_pipeline():
    setup_firebase()
    print("🚀 Starting Rich Data Pipeline Verification...")
    
    # 1. Mock Input Data (Simulate a row from a "Rich" CSV/JSON)
    mock_input = {
        "name": "Test University of Future",
        "country": "DE",
        "city": "Berlin",
        "rank": "10",
        
        # Extended Fields
        "tuition_undergraduate_usd": "15000",
        "tuition_undergraduate_eu_sem": "300",
        "tuition_undergraduate_non_eu_sem": "1500",
        "tuition_student_union_fee_sem": "150",
        
        "admission_min_cgpa": "3.5",
        "admission_min_ielts": "6.5",
        "admission_acceptance_rate": "0.15",
        
        "cost_accommodation": "400-600",
        "cost_groceries": "200",
        
        "programs_bachelors": "50",
        "programs_masters": "40"
    }
    
    # 2. Run Ingestion
    ingestion = DataIngestionService()
    print("🔄 Ingesting mock data...")
    result = ingestion.import_batch([mock_input], "test_source", 2026)
    
    if result['processed'] == 0:
        print(f"❌ Ingestion Failed: {result['errors']}")
        return
        
    print("✅ Ingestion Successful")
    
    # 3. Fetch via Service (API Mapping)
    # We need to find the ID it created. 
    # Logic in ingestion: {country}-{slug} -> de-test-university-of-future
    uni_id = "de-test-university-of-future"
    
    service = FirebaseUniversityService()
    print(f"🔄 Fetching university ID: {uni_id}")
    uni_data = service.get_university_by_id(uni_id)
    
    if not uni_data:
        print("❌ Failed to fetch university from Firestore")
        return
    
    # 4. Verify Output Structure matches User Requirement
    print("🔍 Verifying API Output Structure...")
    # print(json.dumps(uni_data, indent=2))
    
    errors = []
    
    # Verify Tuition Specifics
    # Expect: tuition_fee_eur_per_semester: { EU_EEA: 300, non_EU: 1500 }
    t_sem = uni_data.get('tuition_fee_eur_per_semester')
    if not t_sem:
        errors.append("Missing 'tuition_fee_eur_per_semester'")
    else:
        if t_sem.get('EU_EEA') != 300.0: errors.append(f"Incorrect EU fee: {t_sem.get('EU_EEA')}")
        if t_sem.get('non_EU') != 1500.0: errors.append(f"Incorrect Non-EU fee: {t_sem.get('non_EU')}")

    # Verify Flattened Admission (for backward compat)
    if uni_data.get('min_cgpa') != 3.5: errors.append("Missing/Wrong min_cgpa")
    
    # Verify Living Costs
    # Expect: living_cost_estimate_per_month_eur: { accommodation: "400-600", ... }
    lc = uni_data.get('living_cost_estimate_per_month_eur')
    if not lc:
         errors.append("Missing 'living_cost_estimate_per_month_eur'")
    elif lc.get('accommodation') != "400-600":
         errors.append("Incorrect accommodation cost")

    if errors:
        print("❌ Verification FAILED:")
        for e in errors:
            print(f"   - {e}")
    else:
        print("✅ FULL verification SUCCESS! schema matches user requirements.")
        
    # Cleanup (Optional, but good for idempotent tests)
    # db = firestore.client()
    # db.collection('universities').document(uni_id).delete()

if __name__ == "__main__":
    test_rich_data_pipeline()
