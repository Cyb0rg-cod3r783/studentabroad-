"""
Firebase Bookmark Service
Handles all bookmark-related database operations using Firebase Firestore
"""
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
from typing import Dict, List, Optional, Any
import os

class FirebaseBookmarkService:
    """Service class for Firebase bookmark operations"""
    
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
            self.bookmarks_collection = self.db.collection('bookmarks')
            self.preferences_collection = self.db.collection('user_preferences')
            self.search_history_collection = self.db.collection('search_history')
            print("✅ Firebase Bookmark Service initialized")
            
        except Exception as e:
            print(f"❌ Firebase Bookmark Service initialization failed: {e}")
            raise e
    
    # BOOKMARK OPERATIONS
    def add_bookmark(self, bookmark_data: Dict[str, Any]) -> Dict[str, Any]:
        """Add a new bookmark"""
        try:
            bookmark_doc = {
                'user_id': bookmark_data['user_id'],
                'university_id': bookmark_data['university_id'],
                'university_name': bookmark_data['university_name'],
                'university_country': bookmark_data.get('university_country'),
                'notes': bookmark_data.get('notes', ''),
                'created_at': datetime.utcnow()
            }
            
            doc_ref = self.bookmarks_collection.add(bookmark_doc)
            bookmark_id = doc_ref[1].id
            
            bookmark_doc['id'] = bookmark_id
            return bookmark_doc
            
        except Exception as e:
            print(f"Error adding bookmark: {e}")
            raise e
    
    def get_user_bookmarks(self, user_id: str) -> List[Dict[str, Any]]:
        """Get all bookmarks for a user"""
        try:
            query = self.bookmarks_collection.where('user_id', '==', user_id)
            docs = query.stream()
            
            bookmarks = []
            for doc in docs:
                bookmark_data = doc.to_dict()
                bookmark_data['id'] = doc.id
                bookmarks.append(bookmark_data)
            
            return bookmarks
            
        except Exception as e:
            print(f"Error getting user bookmarks: {e}")
            return []
    
    def remove_bookmark(self, bookmark_id: str, user_id: str) -> bool:
        """Remove a bookmark"""
        try:
            # Verify bookmark belongs to user
            doc = self.bookmarks_collection.document(bookmark_id).get()
            if doc.exists and doc.to_dict().get('user_id') == user_id:
                self.bookmarks_collection.document(bookmark_id).delete()
                return True
            return False
            
        except Exception as e:
            print(f"Error removing bookmark: {e}")
            return False
    
    def update_bookmark_notes(self, bookmark_id: str, user_id: str, notes: str) -> bool:
        """Update bookmark notes"""
        try:
            # Verify bookmark belongs to user
            doc = self.bookmarks_collection.document(bookmark_id).get()
            if doc.exists and doc.to_dict().get('user_id') == user_id:
                self.bookmarks_collection.document(bookmark_id).update({'notes': notes})
                return True
            return False
            
        except Exception as e:
            print(f"Error updating bookmark notes: {e}")
            return False
    
    # USER PREFERENCES OPERATIONS
    def save_user_preference(self, preference_data: Dict[str, Any]) -> Dict[str, Any]:
        """Save user preference"""
        try:
            preference_doc = {
                'user_id': preference_data['user_id'],
                'preference_type': preference_data['preference_type'],
                'preference_value': preference_data['preference_value'],
                'weight': preference_data.get('weight', 1),
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            # Check if preference already exists
            query = self.preferences_collection.where('user_id', '==', preference_data['user_id']).where('preference_type', '==', preference_data['preference_type'])
            existing_docs = list(query.stream())
            
            if existing_docs:
                # Update existing preference
                doc_id = existing_docs[0].id
                preference_doc.pop('created_at')
                self.preferences_collection.document(doc_id).update(preference_doc)
                preference_doc['id'] = doc_id
            else:
                # Create new preference
                doc_ref = self.preferences_collection.add(preference_doc)
                preference_doc['id'] = doc_ref[1].id
            
            return preference_doc
            
        except Exception as e:
            print(f"Error saving user preference: {e}")
            raise e
    
    def get_user_preferences(self, user_id: str) -> List[Dict[str, Any]]:
        """Get all preferences for a user"""
        try:
            query = self.preferences_collection.where('user_id', '==', user_id)
            docs = query.stream()
            
            preferences = []
            for doc in docs:
                preference_data = doc.to_dict()
                preference_data['id'] = doc.id
                preferences.append(preference_data)
            
            return preferences
            
        except Exception as e:
            print(f"Error getting user preferences: {e}")
            return []
    
    # SEARCH HISTORY OPERATIONS
    def save_search_history(self, search_data: Dict[str, Any]) -> Dict[str, Any]:
        """Save search history"""
        try:
            search_doc = {
                'user_id': search_data['user_id'],
                'search_query': search_data['search_query'],
                'search_type': search_data['search_type'],
                'results_count': search_data.get('results_count', 0),
                'created_at': datetime.utcnow()
            }
            
            doc_ref = self.search_history_collection.add(search_doc)
            search_doc['id'] = doc_ref[1].id
            
            return search_doc
            
        except Exception as e:
            print(f"Error saving search history: {e}")
            raise e
    
    def get_user_search_history(self, user_id: str, limit: int = 50) -> List[Dict[str, Any]]:
        """Get search history for a user"""
        try:
            query = self.search_history_collection.where('user_id', '==', user_id).order_by('created_at', direction=firestore.Query.DESCENDING).limit(limit)
            docs = query.stream()
            
            history = []
            for doc in docs:
                search_data = doc.to_dict()
                search_data['id'] = doc.id
                history.append(search_data)
            
            return history
            
        except Exception as e:
            print(f"Error getting user search history: {e}")
            return []