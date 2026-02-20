
from typing import Dict, Any, Optional

class UKTuitionEstimator:
    """
    Applies average tuition fees for the UK.
    Source: British Council / Save the Student (2024/2025).
    """
    
    # Average International Fees (GBP per year)
    # Most courses fall between £15,000 and £25,000
    AVG_UG_FEE = 22000
    AVG_PG_FEE = 17100
    
    # Medicine/Clinical bump
    MEDICINE_FEE = 45000
    
    def estimate_tuition(self, university_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Returns a TuitionInfo object based on university level and name.
        """
        if university_data.get('country') != 'GB':
            return None
            
        name = university_data.get('name', '').lower()
        
        # Determine tuition
        tuition_fee = self.AVG_UG_FEE
        if 'medical' in name or 'medicine' in name or 'dental' in name:
            tuition_fee = self.MEDICINE_FEE
        
        # Construct Tuition Object conforming to schema
        # UK reports annual tuition. 
        # Converting to USD for the undergraduate_usd field using rough rate 1.25
        return {
            "undergraduate_international": tuition_fee,
            "undergraduate_usd": tuition_fee * 1.25,
            
            "graduate_international": self.AVG_PG_FEE,
            "graduate_usd": self.AVG_PG_FEE * 1.25,
            
            "currency": "GBP",
            "tuition_note": f"Estimated average for International Students (2024/25). Fees vary by course."
        }
