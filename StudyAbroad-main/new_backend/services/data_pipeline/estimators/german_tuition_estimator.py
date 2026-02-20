
from typing import Dict, Any, Optional

class GermanTuitionEstimator:
    """
    Applies official state-based tuition rules for Germany.
    Source: Official State Higher Education Acts (Hochschulgesetze).
    
    Rules (as of 2025):
    1. Baden-Württemberg (BW): ~€1,500/semester for Non-EU students + ~€180 admin fee.
    2. Bavaria (BY): Certain universities *may* charge fees under new law, but generally ~€100-300 semester contribution.
    3. Other States: No tuition fees, only "Semester Contribution" (Semesterbeitrag) ~€200-€400.
    """
    
    # Tuition for Non-EU students in Baden-Württemberg
    BW_NON_EU_FEE = 1500
    
    # Average Semester Contribution (Admin fee + Ticket)
    AVG_CONTRIBUTION = 350 
    
    def estimate_tuition(self, university_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Returns a TuitionInfo object based on university location.
        """
        if university_data.get('country') != 'DE':
            return None
            
        state = university_data.get('state', '')
        
        # Default: No tuition, just semester contribution
        tuition_fee = 0
        semester_contribution = self.AVG_CONTRIBUTION
        
        # Baden-Württemberg Rule
        if state and 'Baden-Württemberg' in state:
            tuition_fee = self.BW_NON_EU_FEE
            
        # Construct Tuition Object conforming to schema
        return {
            "tuition_undergraduate_international": tuition_fee + semester_contribution, # Total Cost
            "tuition_undergraduate_eu_sem": semester_contribution,
            "tuition_undergraduate_non_eu_sem": tuition_fee + semester_contribution,
            
            "tuition_graduate_international": tuition_fee + semester_contribution,
            "tuition_graduate_eu_sem": semester_contribution,
            "tuition_graduate_non_eu_sem": tuition_fee + semester_contribution,
            
            "currency": "EUR",
            "tuition_note": f"Estimated based on State Law ({state or 'Unknown'}). Includes Semester Contribution."
        }
