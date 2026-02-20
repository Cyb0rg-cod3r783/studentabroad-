import requests
import json

def find_duplicates(query):
    print(f"Searching for '{query}'...")
    try:
        response = requests.get(f'http://localhost:5001/api/universities?search={query}')
        data = response.json()
        
        if response.status_code == 200 and 'data' in data:
            universities = data['data']
            print(f"Found {len(universities)} results:")
            for uni in universities:
                if isinstance(uni, str):
                    print(f" - [STRING DATA]: {uni}")
                else:
                    print(f" - ID: {uni.get('id')}")
                    print(f"   Name: {uni.get('name')}")
                    print(f"   Country: {uni.get('country')}")
                    print(f"   Ranking: {uni.get('ranking')}")
                    print("---")
        else:
            print(f"❌ API Failed: {data}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    find_duplicates("Massachusetts Institute of Technology")
