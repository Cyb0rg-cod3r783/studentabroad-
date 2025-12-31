# Firebase Migration Guide

## Overview
This guide will help you migrate from SQLite to Firebase for all database operations, making your Study Abroad platform fully cloud-based and accessible to all team members.

## Prerequisites

### 1. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Firestore Database
4. Go to Project Settings → Service Accounts
5. Generate a new private key
6. Save the JSON file as `firebase-service-account.json` in your `backend/` folder

### 2. Install Dependencies
```bash
cd StudyAbroad-main/backend
pip install firebase-admin==6.4.0 bcrypt==4.1.2
```

## Migration Steps

### Step 1: Firebase Configuration
- Place your `firebase-service-account.json` file in the `backend/` directory
- **IMPORTANT**: Add this file to `.gitignore` to keep credentials secure

### Step 2: Database Structure
Firebase will automatically create these collections:
- `users` - User accounts and profiles
- `bookmarks` - User bookmarks
- `user_preferences` - User preferences
- `search_history` - Search history
- `recommendation_results` - AI recommendations
- `admission_predictions` - ML predictions
- `recommendation_sessions` - Recommendation sessions

### Step 3: Data Migration (Optional)
If you have existing SQLite data, you can migrate it:

```python
# Run this script to migrate existing data
python migrate_sqlite_to_firebase.py
```

### Step 4: Update Environment Variables
Remove SQLite-related variables from your `.env` file:
```bash
# Remove these lines:
# DATABASE_URL=sqlite:///database/student_abroad.db

# Keep these:
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
```

### Step 5: Test the Migration
```bash
cd StudyAbroad-main/backend
python app.py
```

Visit `http://localhost:5000/api/health` to verify Firebase connection.

## What Changed

### ✅ Benefits
- **Cloud Storage**: All data is now in the cloud
- **Team Access**: Multiple developers can access the same database
- **Scalability**: Firebase handles scaling automatically
- **Real-time**: Firebase supports real-time updates
- **Backup**: Automatic backups and point-in-time recovery

### 🔄 Updated Files
- `services/firebase_user_service.py` - User management
- `services/firebase_bookmark_service.py` - Bookmarks and preferences
- `services/firebase_recommendation_service.py` - Recommendations and ML results
- `routes/auth.py` - Authentication with Firebase
- `routes/bookmarks.py` - Bookmark operations
- `app.py` - Removed SQLAlchemy dependency

### 🗑️ Removed
- SQLAlchemy models and database initialization
- SQLite database file dependency
- Local database session management

## Security Notes

### 🔒 Important Security Steps
1. **Never commit** `firebase-service-account.json` to version control
2. Add to `.gitignore`:
   ```
   firebase-service-account.json
   *.json
   ```
3. Use environment variables for production deployment
4. Set up Firebase security rules for production

### 🛡️ Firebase Security Rules
Add these rules in Firebase Console → Firestore → Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /bookmarks/{bookmarkId} {
      allow read, write: if request.auth != null && 
        resource.data.user_id == request.auth.uid;
    }
    
    // Add similar rules for other collections
  }
}
```

## Troubleshooting

### Common Issues

1. **"Firebase service account file not found"**
   - Ensure `firebase-service-account.json` is in the `backend/` folder
   - Check file permissions

2. **"Permission denied"**
   - Verify Firebase project settings
   - Check Firestore is enabled
   - Ensure service account has proper permissions

3. **"Module not found"**
   - Install required packages: `pip install firebase-admin bcrypt`

### Testing Firebase Connection
```python
# Test script
from services.firebase_user_service import FirebaseUserService

try:
    service = FirebaseUserService()
    print("✅ Firebase connected successfully!")
except Exception as e:
    print(f"❌ Firebase connection failed: {e}")
```

## Team Collaboration

### For Team Members
1. Get the `firebase-service-account.json` file from team lead (securely)
2. Place it in your `backend/` folder
3. Install dependencies: `pip install firebase-admin bcrypt`
4. Run the app: `python app.py`

### For Production Deployment
1. Use environment variables instead of JSON file
2. Set up proper Firebase security rules
3. Configure Firebase project for production use
4. Set up monitoring and logging

## Next Steps
1. Test all endpoints with Firebase
2. Update frontend if needed (API endpoints remain the same)
3. Set up Firebase security rules
4. Configure production environment
5. Train team on Firebase console usage

Your Study Abroad platform is now fully cloud-based! 🚀