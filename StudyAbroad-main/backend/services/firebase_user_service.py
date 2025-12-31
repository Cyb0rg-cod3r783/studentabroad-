"""
Firebase User Service
Handles all user-related database operations using Firebase Firestore
"""
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
from typing import Dict, List, Optional, Any
import bcrypt
import os

class FirebaseUserService:
    """Service class for Firebase user operations"""
    
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
            self.users_collection = self.db.collection('users')
            print("✅ Firebase User Service initialized")
            
        except Exception as e:
            print(f"❌ Firebase User Service initialization failed: {e}")
            raise e
    
    def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new user"""
        try:
            # Hash password
            password_hash = bcrypt.hashpw(
                user_data['password'].encode('utf-8'), 
                bcrypt.gensalt()
            ).decode('utf-8')
            
            # Prepare user document
            user_doc = {
                'email': user_data['email'],
                'password_hash': password_hash,
                'cgpa': user_data.get('cgpa'),
                'gre_score': user_data.get('gre_score'),
                'ielts_score': user_data.get('ielts_score'),
                'toefl_score': user_data.get('toefl_score'),
                'field_of_study': user_data.get('field_of_study'),
                'preferred_countries': user_data.get('preferred_countries'),
                'budget_min': user_data.get('budget_min'),
                'budget_max': user_data.get('budget_max'),
                'resume_url': user_data.get('resume_url'),
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Add to Firestore
            doc_ref = self.users_collection.add(user_doc)
            user_id = doc_ref[1].id
            
            # Return user data with ID
            user_doc['id'] = user_id
            user_doc.pop('password_hash', None)  # Don't return password hash
            
            return user_doc
            
        except Exception as e:
            print(f"Error creating user: {e}")
            raise e
    
    def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Get user by email"""
        try:
            query = self.users_collection.where('email', '==', email).limit(1)
            docs = query.stream()
            
            for doc in docs:
                user_data = doc.to_dict()
                user_data['id'] = doc.id
                return user_data
            
            return None
            
        except Exception as e:
            print(f"Error getting user by email: {e}")
            return None
    
    def get_user_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user by ID"""
        try:
            doc = self.users_collection.document(user_id).get()
            
            if doc.exists:
                user_data = doc.to_dict()
                user_data['id'] = doc.id
                user_data.pop('password_hash', None)  # Don't return password hash
                return user_data
            
            return None
            
        except Exception as e:
            print(f"Error getting user by ID: {e}")
            return None
    
    def update_user(self, user_id: str, update_data: Dict[str, Any]) -> bool:
        """Update user data"""
        try:
            # Add updated timestamp
            update_data['updated_at'] = datetime.utcnow()
            
            # Hash password if provided
            if 'password' in update_data:
                password_hash = bcrypt.hashpw(
                    update_data['password'].encode('utf-8'), 
                    bcrypt.gensalt()
                ).decode('utf-8')
                update_data['password_hash'] = password_hash
                update_data.pop('password')
            
            # Update document
            self.users_collection.document(user_id).update(update_data)
            return True
            
        except Exception as e:
            print(f"Error updating user: {e}")
            return False
    
    def verify_password(self, email: str, password: str) -> Optional[Dict[str, Any]]:
        """Verify user password and return user data"""
        try:
            user = self.get_user_by_email(email)
            if not user:
                return None
            
            # Get password hash from database
            doc = self.users_collection.document(user['id']).get()
            user_data = doc.to_dict()
            
            if bcrypt.checkpw(password.encode('utf-8'), user_data['password_hash'].encode('utf-8')):
                user_data['id'] = doc.id
                user_data.pop('password_hash', None)
                return user_data
            
            return None
            
        except Exception as e:
            print(f"Error verifying password: {e}")
            return None
    
    def delete_user(self, user_id: str) -> bool:
        """Delete user"""
        try:
            self.users_collection.document(user_id).delete()
            return True
            
        except Exception as e:
            print(f"Error deleting user: {e}")
            return False