import requests
import logging
import time
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class WikidataFetcher:
    """
    Fetches university data from Wikidata using SPARQL.
    Focuses on US, UK, Canada, Germany.
    """
    
    SPARQL_ENDPOINT = "https://query.wikidata.org/sparql"
    
    # Country Q-IDs
    COUNTRIES = {
        "US": "Q30",
        "GB": "Q145",
        "CA": "Q16",
        "DE": "Q183"
    }
    
    def fetch_all(self) -> List[Dict[str, Any]]:
        """Fetch universities for all target countries"""
        all_data = []
        
        for code, qid in self.COUNTRIES.items():
            logger.info(f"🌍 Fetching Wikidata for {code} ({qid})...")
            country_data = self._fetch_by_country(code, qid)
            logger.info(f"   Found {len(country_data)} universities for {code}")
            all_data.extend(country_data)
            time.sleep(1) # Be nice to the API
            
        return all_data
    
    def _fetch_by_country(self, country_code: str, qid: str) -> List[Dict[str, Any]]:
        # Custom query per country to ensure we get right admin data
        # Mapping country codes to their administrative division types (State, Province, etc.)
        admin_map = {
            "DE": "wd:Q1221156",  # State of Germany
            "US": "wd:Q35657",   # State of the United States
            "CA": "wd:Q11828004", # Province of Canada
            "GB": "wd:Q22662"    # Constituent country (UK)
        }
        
        state_query_part = ""
        if country_code in admin_map:
            state_query_part = f"""
            OPTIONAL {{ 
                ?uni wdt:P131* ?state .
                ?state wdt:P31 {admin_map[country_code]} . 
            }}
            """
        
        query = f"""
        SELECT DISTINCT ?uni ?uniLabel ?website ?cityLabel ?stateLabel ?inception ?students ?logo
        WHERE {{
          # Instance of university (Q3918) or subclass
          ?uni wdt:P31/wdt:P279* wd:Q3918 .
          
          # Located in country
          ?uni wdt:P17 wd:{qid} .
          
          # Must have a website (good proxy for being a real/active uni)
          OPTIONAL {{ ?uni wdt:P856 ?website }}
          
          # Optional data
          OPTIONAL {{ ?uni wdt:P131 ?city }}      # Admin Location (City)
          {state_query_part}                      # State (Bundesland) if valid
          OPTIONAL {{ ?uni wdt:P571 ?inception }}  # Established
          OPTIONAL {{ ?uni wdt:P2196 ?students }}  # Student Count
          OPTIONAL {{ ?uni wdt:P154 ?logo }}       # Logo Image
          
          SERVICE wikibase:label {{ bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }}
        }}
        LIMIT 3000
        """
        
        try:
            response = requests.get(
                self.SPARQL_ENDPOINT, 
                params={'format': 'json', 'query': query},
                headers={'User-Agent': 'StudyAbroadBot/1.0 (tejas@example.com)'} # Required by Wikidata policy
            )
            
            if response.status_code != 200:
                logger.error(f"❌ Wikidata API Error ({response.status_code}): {response.text}")
                return []
                
            data = response.json()
            results = data.get('results', {}).get('bindings', [])
            return self._parse_results(results, country_code)
            
        except Exception as e:
            logger.error(f"❌ Exception fetching {country_code}: {e}")
            return []

    def _parse_results(self, bindings: List[Dict], country_code: str) -> List[Dict[str, Any]]:
        parsed = []
        for item in bindings:
            try:
                # Basic fields
                name = item.get('uniLabel', {}).get('value')
                if not name or name.startswith("Q"): continue # Skip unlabelled
                
                # Website
                website = item.get('website', {}).get('value')
                
                # City (Clean up)
                city = item.get('cityLabel', {}).get('value', 'Unknown')
                
                # State (for DE specifically)
                state = item.get('stateLabel', {}).get('value')
                
                # Established
                established = None
                inception = item.get('inception', {}).get('value')
                if inception:
                    # Format: 1861-01-01T00:00:00Z
                    try: established = int(inception[:4])
                    except: pass
                    
                # Students
                student_pop = None
                students = item.get('students', {}).get('value')
                if students:
                    try: student_pop = int(float(students))
                    except: pass
                
                # Construct Schema Object
                obj = {
                    "name": name,
                    "country": country_code,
                    "city": city,
                    "state": state, # New field
                    "website": website,
                    "established": established,
                    "student_population": student_pop,
                    "type": "Public", # Default
                    "source": "wikidata"
                }
                
                # Add logo if exists (we might map this to image later)
                # if item.get('logo'): obj['logo_url'] = item.get('logo').get('value')
                
                parsed.append(obj)
                
            except Exception as e:
                continue
                
        return parsed
