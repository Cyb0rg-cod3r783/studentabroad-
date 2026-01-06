"""
Firebase Recommendation Service
Handles all recommendation-related database operations using Firebase Firestore
"""
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
from typing import Dict, List, Optional, Any
import os

class FirebaseRecommendationService:
    """Service class for Firebase recommendation operations"""
    
    def __init__(self):
        """Initialize Firebase service"""
        try:
            # Initialize Firebase if not already done
            if not firebase_admin._apps:
                service_account_path = "firebase-service-account.json"
                
                if os.path.exists(service_account_path):
                    cred = credentials.Certificate(service_account_path)
                    firebase_admin.initialize_app(cred)
                else:
                    raise Exception("Firebase service account file not found")
            
            self.db = firestore.client()
            self.recommendations_collection = self.db.collection('recommendation_results')
            self.predictions_collection = self.db.collection('admission_predictions')
            self.sessions_collection = self.db.collection('recommendation_sessions')
            print("✅ Firebase Recommendation Service initialized")
            
        except Exception as e:
            print(f"❌ Firebase Recommendation Service initialization failed: {e}")
            raise e
    
    # RECOMMENDATION RESULTS OPERATIONS
    def save_recommendation_result(self, recommendation_data: Dict[str, Any]) -> Dict[str, Any]:
        """Save recommendation result"""
        try:
            recommendation_doc = {
                'user_id': recommendation_data['user_id'],
                'university_id': recommendation_data['university_id'],
                'university_name': recommendation_data['university_name'],
                'university_country': recommendation_data.get('university_country'),
                'admission_probability': recommendation_data.get('admission_probability'),
                'cost_fit_score': recommendation_data.get('cost_fit_score'),
                'overall_score': recommendation_data.get('overall_score'),
                'ranking_position': recommendation_data.get('ranking_position'),
                'reasons': recommendation_data.get('reasons'),
                'confidence_level': recommendation_data.get('confidence_level'),
                'created_at': datetime.utcnow()
            }
            
            doc_ref = self.recommendations_collection.add(recommendation_doc)
            recommendation_doc['id'] = doc_ref[1].id
            
            return recommendation_doc
            
        except Exception as e:
            print(f"Error saving recommendation result: {e}")
            raise e
    
    def get_user_recommendations(self, user_id: str, limit: int = 50) -> List[Dict[str, Any]]:
        """Get recommendations for a user"""
        try:
            query = self.recommendations_collection.where('user_id', '==', user_id).order_by('created_at', direction=firestore.Query.DESCENDING).limit(limit)
            docs = query.stream()
            
            recommendations = []
            for doc in docs:
                recommendation_data = doc.to_dict()
                recommendation_data['id'] = doc.id
                recommendations.append(recommendation_data)
            
            return recommendations
            
        except Exception as e:
            print(f"Error getting user recommendations: {e}")
            return []
    
    def get_latest_recommendations(self, user_id: str, session_id: str = None) -> List[Dict[str, Any]]:
        """Get latest recommendations for a user, optionally filtered by session"""
        try:
            query = self.recommendations_collection.where('user_id', '==', user_id)
            
            if session_id:
                query = query.where('session_id', '==', session_id)
            
            query = query.order_by('ranking_position').limit(20)
            docs = query.stream()
            
            recommendations = []
            for doc in docs:
                recommendation_data = doc.to_dict()
                recommendation_data['id'] = doc.id
                recommendations.append(recommendation_data)
            
            return recommendations
            
        except Exception as e:
            print(f"Error getting latest recommendations: {e}")
            return []
    
    # ADMISSION PREDICTIONS OPERATIONS
    def save_admission_prediction(self, prediction_data: Dict[str, Any]) -> Dict[str, Any]:
        """Save admission prediction"""
        try:
            prediction_doc = {
                'user_id': prediction_data['user_id'],
                'university_id': prediction_data['university_id'],
                'university_name': prediction_data['university_name'],
                'predicted_probability': prediction_data['predicted_probability'],
                'confidence_score': prediction_data.get('confidence_score'),
                'factors_analyzed': prediction_data.get('factors_analyzed'),
                'model_version': prediction_data.get('model_version'),
                'created_at': datetime.utcnow()
            }
            
            doc_ref = self.predictions_collection.add(prediction_doc)
            prediction_doc['id'] = doc_ref[1].id
            
            return prediction_doc
            
        except Exception as e:
            print(f"Error saving admission prediction: {e}")
            raise e
    
    def get_user_predictions(self, user_id: str) -> List[Dict[str, Any]]:
        """Get admission predictions for a user"""
        try:
            query = self.predictions_collection.where('user_id', '==', user_id).order_by('created_at', direction=firestore.Query.DESCENDING)
            docs = query.stream()
            
            predictions = []
            for doc in docs:
                prediction_data = doc.to_dict()
                prediction_data['id'] = doc.id
                predictions.append(prediction_data)
            
            return predictions
            
        except Exception as e:
            print(f"Error getting user predictions: {e}")
            return []
    
    # RECOMMENDATION SESSIONS OPERATIONS
    def create_recommendation_session(self, session_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new recommendation session"""
        try:
            session_doc = {
                'user_id': session_data['user_id'],
                'session_type': session_data['session_type'],
                'user_profile_snapshot': session_data.get('user_profile_snapshot'),
                'total_recommendations': session_data.get('total_recommendations', 0),
                'filters_applied': session_data.get('filters_applied'),
                'is_active': True,
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            doc_ref = self.sessions_collection.add(session_doc)
            session_doc['id'] = doc_ref[1].id
            
            return session_doc
            
        except Exception as e:
            print(f"Error creating recommendation session: {e}")
            raise e
    
    def update_recommendation_session(self, session_id: str, update_data: Dict[str, Any]) -> bool:
        """Update recommendation session"""
        try:
            update_data['updated_at'] = datetime.utcnow()
            self.sessions_collection.document(session_id).update(update_data)
            return True
            
        except Exception as e:
            print(f"Error updating recommendation session: {e}")
            return False
    
    def get_user_sessions(self, user_id: str, active_only: bool = False) -> List[Dict[str, Any]]:
        """Get recommendation sessions for a user"""
        try:
            query = self.sessions_collection.where('user_id', '==', user_id)
            
            if active_only:
                query = query.where('is_active', '==', True)
            
            query = query.order_by('created_at', direction=firestore.Query.DESCENDING)
            docs = query.stream()
            
            sessions = []
            for doc in docs:
                session_data = doc.to_dict()
                session_data['id'] = doc.id
                sessions.append(session_data)
            
            return sessions
            
        except Exception as e:
            print(f"Error getting user sessions: {e}")
            return []
    
    def close_recommendation_session(self, session_id: str) -> bool:
        """Close/deactivate a recommendation session"""
        try:
            self.sessions_collection.document(session_id).update({
                'is_active': False,
                'updated_at': datetime.utcnow()
            })
            return True
            
        except Exception as e:
            print(f"Error closing recommendation session: {e}")
            return False