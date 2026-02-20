import requests
import json

try:
    response = requests.get('http://localhost:5001/api/universities?per_page=1')
    data = response.json()
    
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print("✅ API Success")
        if data['data']:
            uni = data['data'][0]
            print(f"Sample University: {uni.get('name')}")
            print(f"Fields present: {list(uni.keys())}")
            # Check key fields
            required = ['ranking', 'tuition_fee', 'country', 'id']
            missing = [f for f in required if f not in uni]
            if not missing:
                print("✅ Required fields (ranking, tuition_fee, country, id) present")
            else:
                print(f"❌ Missing fields: {missing}")
        else:
            print("❌ No data returned")
    else:
        print(f"❌ API Failed: {data}")
except Exception as e:
    print(f"❌ Error: {e}")
