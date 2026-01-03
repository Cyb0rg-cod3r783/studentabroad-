# Team Setup Guide - Firebase Access

## For New Team Members

### Step 1: Get Firebase Access
1. Ask the team lead to add you to the Firebase project
2. You'll receive an email invitation to join the project
3. Accept the invitation using your Gmail account

### Step 2: Generate Your Service Account
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select the "Study Abroad" project
3. Go to **Project Settings** (gear icon) → **Service Accounts**
4. Click **"Generate new private key"**
5. Download the JSON file
6. Rename it to `firebase-service-account.json`

### Step 3: Setup Your Local Environment
1. **Clone the repository:**
   ```bash
   git clone [repository-url]
   cd StudyAbroad-main/backend
   ```

2. **Place the Firebase file:**
   - Put `firebase-service-account.json` in the `backend/` folder
   - **DO NOT** commit this file to Git (it's already in .gitignore)

3. **Install dependencies:**
   ```bash
   pip install firebase-admin bcrypt
   pip install -r requirements.txt
   ```

4. **Test the setup:**
   ```bash
   python app.py
   ```
   
   You should see:
   ```
   ✅ Firebase User Service initialized
   ✅ Firebase University Service initialized
   ✅ Firebase Bookmark Service initialized
   ✅ Firebase Recommendation Service initialized
   ```

### Step 4: Verify Database Access
1. **Test the health endpoint:**
   - Visit: http://localhost:5000/api/health
   - Should show: `"firebase": "connected"`

2. **Access Firebase Console:**
   - Go to Firebase Console → Firestore Database
   - You should see the collections: `users`, `bookmarks`, `universities`, etc.

## Security Notes

### ✅ DO:
- Keep your `firebase-service-account.json` file secure
- Only share it through secure channels
- Generate your own service account key

### ❌ DON'T:
- Commit the JSON file to Git
- Share your credentials publicly
- Use someone else's service account file

## Troubleshooting

### "Firebase service account file not found"
- Make sure `firebase-service-account.json` is in the `backend/` folder
- Check the filename is exactly `firebase-service-account.json`

### "Permission denied"
- Ask team lead to check your Firebase project permissions
- Make sure you accepted the Firebase invitation email

### "Module not found"
- Install dependencies: `pip install firebase-admin bcrypt`

## Need Help?
Contact the team lead or check the main project documentation.