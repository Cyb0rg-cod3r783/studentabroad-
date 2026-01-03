# 🎓 Study Abroad Final Boss

## 📖 Project Overview
**Study Abroad Final Boss** is a comprehensive, all-in-one platform designed to simplify the complex journey of international education. It serves as a personal guide for students aspiring to study abroad, providing powerful tools to discover, compare, and apply to universities worldwide.

The platform bridges the gap between students and global opportunities by offering data-driven insights, personalized recommendations, and a centralized hub for managing the application process. Whether you are looking for the best computer science program in the US or an affordable engineering degree in Germany, this platform helps you make informed decisions.

### 🌟 Key Features
- **Smart University Search**: Filter thousands of universities by country, field of study, tuition fees, and standardized test requirements (GRE, IELTS, TOEFL).
- **AI-Powered Recommendations**: Get personalized university suggestions based on your profile, academic score (CGPA), and budget.
- **Detailed Analytics**: View comprehensive data including acceptance rates, living costs, rankings, and student demographics.
- **Comparison Tool**: Compare multiple universities side-by-side to weigh pros and cons effectively.
- **Bookmark System**: Save your dream universities to a personal watchlist for easy access.
- **Secure Authentication**: Robust user account management powered by JWT and Firebase.

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern, component-based UI development.
- **React Router**: Seamless client-side navigation.
- **Axios**: Efficient API communication.
- **Chart.js**: Interactive data visualizations for university statistics.
- **CSS3**: Custom, responsive styling with modern aesthetics.

### Backend
- **Flask**: Lightweight and flexible Python web framework.
- **Firebase**: Real-time database and authentication services.
- **JWT (JSON Web Tokens)**: Secure, stateless authentication.
- **Pandas & Scikit-learn**: Data processing and recommendation algorithms.
- **Flask-CORS**: Handling cross-origin requests between frontend and backend.

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** (Node Package Manager)

### 1. Installation

**Clone the repository:**
```bash
git clone <repository-url>
cd "Study Abroad Final Boss"
```

### 2. Backend Setup
The backend runs on Flask and connects to Firebase.

```bash
# Navigate to the backend directory
cd StudyAbroad-main/backend

# Create a virtual environment (optional but recommended)
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
python app.py
```
> The backend server will start at `http://localhost:5000`.

### 3. Frontend Setup
The frontend is a React application.

```bash
# Open a new terminal and navigate to the frontend directory
cd StudyAbroad-main/frontend

# Install dependencies
npm install

# Start the development server
npm start
```
> The frontend application will open at `http://localhost:3000`.

## 📂 Project Structure

```
Study Abroad Final Boss/
├── README.md               # Project documentation
└── StudyAbroad-main/
    ├── backend/            # Flask API & Logic
    │   ├── app.py          # Entry point
    │   ├── routes/         # API endpoints
    │   ├── services/       # Business logic & Firebase integration
    │   └── models/         # Data models
    ├── frontend/           # React Application
    │   ├── src/
    │   │   ├── components/ # Reusable UI components
    │   │   ├── pages/      # Application pages
    │   │   └── services/   # API integration
    │   ├── public/         # Static assets
    │   └── package.json    # Frontend dependencies
    └── data/               # Project datasets
```

## 📡 API Overview
The backend exposes a RESTful API. Here are some key endpoints:
- **Auth**: `/api/auth/login`, `/api/auth/register`
- **Universities**: `/api/universities` (Search), `/api/universities/{id}` (Details)
- **Recommendations**: `/api/recommendations/generate`
- **Bookmarks**: `/api/bookmarks`

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.