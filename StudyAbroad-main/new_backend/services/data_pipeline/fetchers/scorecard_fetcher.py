import requests
import logging
import os
from typing import List, Dict, Any

logger = logging.getLogger(__name__)

class ScorecardFetcher:
    """
    Fetches rich university data from US Dept of Education College Scorecard API.
    Requires COLLEGE_SCORECARD_API_KEY env var.
    """
    
    BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools"
    
    def fetch_all(self, limit=4000) -> List[Dict[str, Any]]:
        """Fetch updated data for US universities"""
        api_key = os.getenv('COLLEGE_SCORECARD_API_KEY')
        if not api_key:
            logger.warning("⚠️ COLLEGE_SCORECARD_API_KEY not found. Skipping Scorecard fetch.")
            return []
            
        logger.info("🇺🇸 Fetching US College Scorecard Data...")
        
        # Fields to fetch (mapping to our schema needed)
        # We fetch ID, Name, Tuition, Admission, Stats
        fields = [
            "id",
            "school.name",
            "school.school_url",
            "latest.cost.tuition.out_of_state",
            "latest.cost.tuition.in_state",
            "latest.student.size",
            "latest.admissions.admission_rate.overall",
            "latest.admissions.sat_scores.average.overall",
            "latest.admissions.act_scores.midpoint.cumulative",
            "latest.programs.cip_4_digit" # Can get program counts from this
        ]
        
        params = {
            "api_key": api_key,
            "fields": ",".join(fields),
            "per_page": min(limit, 100),
            "page": 0,
            "school.operating": 1,
            "school.degrees_awarded.predominant": "2,3" # Associates and Bachelors+
        }
        
        all_data = []
        page = 0
        
        # Taking a safety limit to avoid hitting rate limits or long fetches in dev
        MAX_PAGES = 5 if limit < 1000 else 50
        
        try:
            while page < MAX_PAGES:
                params['page'] = page
                response = requests.get(self.BASE_URL, params=params)
                
                if response.status_code != 200:
                    logger.error(f"❌ Scorecard API Error ({response.status_code}): {response.text}")
                    break
                    
                data = response.json()
                results = data.get('results', [])
                if not results:
                    break
                    
                parsed = self._parse_results(results)
                all_data.extend(parsed)
                
                logger.info(f"   Fetched page {page+1} ({len(results)} items)")
                page += 1
                
                # Check pagination
                total = data.get('metadata', {}).get('total', 0)
                if len(all_data) >= total or len(all_data) >= limit:
                    break
                    
        except Exception as e:
            logger.error(f"❌ Exception fetching Scorecard: {e}")
            
        return all_data

    def _parse_results(self, results: List[Dict]) -> List[Dict[str, Any]]:
        parsed = []
        for item in results:
            try:
                name = item.get('school.name')
                if not name: continue
                
                # Map to our UniversityIngestionSchema
                obj = {
                    "name": name,
                    "country": "US",
                    "website": item.get('school.school_url'),
                    "student_population": item.get('latest.student.size'),
                    
                    # Tuition
                    "tuition_undergraduate_usd": item.get('latest.cost.tuition.out_of_state'),  # Using out-of-state for intl baseline
                    
                    # Admission
                    "admission_acceptance_rate": item.get('latest.admissions.admission_rate.overall'),
                    "admission_min_sat": item.get('latest.admissions.sat_scores.average.overall'), # Avg as proxy/baseline
                    # Note: We track min_gre/gmat usually, checking if we can map SAT/ACT roughly or store as additional
                    
                    "source": "us_college_scorecard"
                }
                
                # Clean None values
                obj = {k: v for k, v in obj.items() if v is not None}
                parsed.append(obj)
                
            except Exception as e:
                continue
                
        return parsed
