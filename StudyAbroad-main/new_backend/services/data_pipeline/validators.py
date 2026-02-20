"""
University Data Validators
Uses Pydantic for schema validation before Firestore writes
"""

from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any, Union
from datetime import datetime

# Target countries restricted scope
TARGET_COUNTRIES = ['US', 'CA', 'GB', 'DE']

class UniversityBase(BaseModel):
    """Base schema for University Data"""
    name: str
    country: str
    city: Optional[str] = "Unknown"
    state: Optional[str] = None
    website: Optional[str] = None
    established: Optional[int] = None
    type: str = Field(default="Public")
    
    # Metadata
    rankings: Optional[List[Dict]] = []
    
    @validator('country')
    def validate_country(cls, v):
        upper_v = v.upper()
        # Map common code variations if needed, but strict is better for ingestion
        if upper_v == 'UK': upper_v = 'GB'
        
        if upper_v not in TARGET_COUNTRIES:
            raise ValueError(f"Country '{v}' not in supported list: {TARGET_COUNTRIES}")
        return upper_v

class RankingEntry(BaseModel):
    """Schema for a single ranking entry"""
    source: str
    rank: int
    year: int
    score: Optional[float] = None
    
    @validator('rank')
    def validate_rank(cls, v):
        if v < 1:
            raise ValueError("Rank must be positive")
        return v

class AdmissionRequirements(BaseModel):
    """Schema for Admission Requirements"""
    min_cgpa: Optional[float] = None
    min_gre: Optional[int] = None
    min_gmat: Optional[int] = None
    min_ielts: Optional[float] = None
    min_toefl: Optional[int] = None
    acceptance_rate: Optional[float] = None  # 0.0 to 1.0

class TuitionInfo(BaseModel):
    """Schema for Tuition Data (Expanded)"""
    undergraduate_usd: Optional[float] = None
    graduate_usd: Optional[float] = None
    
    # Granular fees (Eur per semester / year)
    undergraduate_eu_sem: Optional[float] = None
    undergraduate_non_eu_sem: Optional[float] = None
    graduate_eu_sem: Optional[float] = None
    graduate_non_eu_sem: Optional[float] = None
    
    currency: str = "USD"
    student_union_fee_sem: Optional[float] = None
    last_updated: datetime = Field(default_factory=datetime.utcnow)

class LivingCosts(BaseModel):
    """Estimated Monthly Living Costs"""
    accommodation: Optional[str] = None  # "400-800"
    groceries: Optional[str] = None
    transport: Optional[str] = None
    personal: Optional[str] = None
    total_estimate_usd: Optional[float] = None

class DegreePrograms(BaseModel):
    """Program Counts"""
    bachelors: Optional[int] = 0
    masters: Optional[int] = 0
    doctoral: Optional[int] = 0
    teacher_training: Optional[int] = 0

class UniversityIngestionSchema(UniversityBase):
    """Complete schema for data ingestion"""
    current_ranking: Optional[int] = None
    current_ranking_source: Optional[str] = None
    
    native_name: Optional[str] = None
    motto: Optional[str] = None
    
    # Stats
    student_population: Optional[int] = None
    international_students: Optional[int] = None
    staff_count: Optional[int] = None
    total_programs: Optional[int] = None
    
    # Nested Data
    admission_requirements: Optional[AdmissionRequirements] = None
    tuition: Optional[TuitionInfo] = None
    living_costs: Optional[LivingCosts] = None
    degree_programs: Optional[DegreePrograms] = None
    
    # Lists
    faculties: Optional[List[str]] = []
    exchange_programs: Optional[List[str]] = []
    
    class Config:
        arbitrary_types_allowed = True
