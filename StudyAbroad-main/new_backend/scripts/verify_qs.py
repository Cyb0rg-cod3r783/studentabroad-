import requests
import json

try:
    # Fetch MIT specifically as it's usually in QS top list
    response = requests.get('http://localhost:5001/api/universities?search=Massachusetts')
    data = response.json()
    
    print(f"Data type: {type(data)}")
    if response.status_code == 200:
        if 'data' in data:
            for uni in data['data']:
                # print(f"Checking: {uni}") 
                if isinstance(uni, dict) and "Massachusetts Institute of Technology" in uni.get('name', ''):
                    print(f"✅ Found MIT")
                    print(f"   Rank: {uni.get('ranking')}")
                    print(f"   Country: {uni.get('country')}")
                    if uni.get('ranking'):
                        print("✅ Ranking data present")
                        found = True
                    else:
                        print("❌ Ranking data MISSING")
                    break
    
    if not found:
        print("❌ MIT not found or no ranking data")

except Exception as e:
    print(f"❌ Error: {e}")
