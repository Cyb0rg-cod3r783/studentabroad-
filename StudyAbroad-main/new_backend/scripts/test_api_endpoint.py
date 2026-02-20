
import requests
import json

def test_api():
    try:
        url = 'http://localhost:5001/api/universities'
        print(f"Testing {url}...")
        r = requests.get(url)
        print(f"Status Code: {r.status_code}")
        print(f"Headers: {dict(r.headers)}")
        
        if 'application/json' in r.headers.get('Content-Type', ''):
            data = r.json()
            print(f"Received JSON. Success: {data.get('success')}")
            if 'data' in data and 'universities' in data['data']:
                unis = data['data']['universities']
                print(f"Count: {len(unis)}")
                if unis:
                    print(f"First Uni: {unis[0].get('name')}")
            else:
                print("Data structure mismatch or result empty")
        else:
            print("Response is NOT JSON")
            print(f"Snippet: {r.text[:500]}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_api()
