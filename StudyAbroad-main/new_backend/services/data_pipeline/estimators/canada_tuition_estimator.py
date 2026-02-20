
from typing import Dict, Any, Optional

class CanadaTuitionEstimator:
    """
    Applies provincial average tuition fees for Canada.
    Source: Statistics Canada Table 37-10-0045-01 (2024/2025).
    """
    
    # Provincial Averages for International Undergraduate Tuition (CAD)
    # Source: Statistics Canada 2024/2025
    PROVINCIAL_AVG = {
        "Ontario": 48013,
        "British Columbia": 38000, # Estimated second highest
        "Quebec": 34614,
        "Nova Scotia": 27973,
        "Prince Edward Island": 19749,
        "Newfoundland and Labrador": 18142,
        "New Brunswick": 18572,
        "Manitoba": 20000, # Estimate
        "Saskatchewan": 22000, # Estimate
        "Alberta": 30000, # Estimate
    }
    
    NATIONAL_AVG = 39974
    
    # Average Mandatory Fees/Ancillary Fees
    AVG_ANCILLARY_FEE = 1500
    
    def estimate_tuition(self, university_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Returns a TuitionInfo object based on university province.
        """
        if university_data.get('country') != 'CA':
            return None
            
        state = university_data.get('state', '')
        
        # Determine tuition based on province
        tuition_fee = self.NATIONAL_AVG
        for province, avg in self.PROVINCIAL_AVG.items():
            if state and province in state:
                tuition_fee = avg
                break
        
        # Construct Tuition Object conforming to schema
        # Canada usually reports annual tuition, converting to semester for consistency if needed, 
        # but our schema can handle both. Using annual as it's more standard for CA.
        return {
            "undergraduate_international": tuition_fee + self.AVG_ANCILLARY_FEE,
            "undergraduate_usd": (tuition_fee + self.AVG_ANCILLARY_FEE) * 0.74, # Rough CAD to USD
            
            "graduate_international": tuition_fee * 0.6 + self.AVG_ANCILLARY_FEE, # Grad is often cheaper in CA
            "graduate_usd": (tuition_fee * 0.6 + self.AVG_ANCILLARY_FEE) * 0.74,
            
            "currency": "CAD",
            "tuition_note": f"Estimated provincial average for {state or 'Canada'}. Includes ancillary fees."
        }
