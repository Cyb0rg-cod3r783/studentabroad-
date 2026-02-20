import requests
import json

def test_ranking_filter(max_rank):
    print(f"Testing max_ranking={max_rank}...")
    try:
        response = requests.get(f'http://localhost:5001/api/universities?max_ranking={max_rank}&per_page=50')
        data = response.json()
        
        if response.status_code == 200 and 'data' in data:
            universities = data['data']
            print(f"Received {len(universities)} universities")
            
            all_valid = True
            for uni in universities:
                if isinstance(uni, str):
                    print(f"❌ Error: Expected dict, got str: {uni[:50]}...")
                    all_valid = False
                    continue
                    
                rank = uni.get('ranking')
                name = uni.get('name')
                
                # If filtered by max_rank, unranked should NOT be present (logic we added)
                if rank is None or rank == 0:
                    print(f"❌ Unranked university found in filtered list: {name}")
                    all_valid = False
                elif int(rank) > max_rank:
                    print(f"❌ University rank {rank} > {max_rank}: {name}")
                    all_valid = False
                # else:
                #     print(f"✅ {name}: #{rank}")
            
            if all_valid:
                print("✅ All returned universities match criteria")
            else:
                print("❌ Filter FAILED")
        else:
            print(f"❌ API Failed: {data}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    # Test Top 10
    test_ranking_filter(10)
    # Test Top 50
    test_ranking_filter(50)
