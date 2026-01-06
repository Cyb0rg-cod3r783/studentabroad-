from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token
import re
from datetime import timedelta
from services.firebase_user_service import FirebaseUserService

# Create blueprint for authentication routes
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# Initialize Firebase User Service
try:
    user_service = FirebaseUserService()
    print("✅ Auth using Firebase User Service")
except Exception as e:
    print(f"❌ Firebase User Service failed: {e}")
    user_service = None

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """Simple password validation"""
    if not password:
        return False, "Password is required"
    if len(password) < 6:
        return False, "Password must be at least 6 characters long"
    if len(password) > 128:
        return False, "Password is too long (maximum 128 characters)"
    return True, "Password is valid"

@auth_bp.route('/register', methods=['POST'])
def register():
    """Firebase user registration endpoint"""
    try:
        if not user_service:
            return jsonify({
                'error': 'User service not available',
                'code': 'SERVICE_UNAVAILABLE'
            }), 503
            
        data = request.get_json()
        
        # Validate required fields
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({
                'error': 'Email and password are required',
                'code': 'MISSING_FIELDS'
            }), 400
        
        # Get and validate email
        email = data.get('email', '').strip().lower()
        if not validate_email(email):
            return jsonify({
                'error': 'Invalid email format',
                'code': 'INVALID_EMAIL'
            }), 400
        
        password = data.get('password')
        
        # Simple password validation
        is_valid, message = validate_password(password)
        if not is_valid:
            return jsonify({
                'error': message,
                'code': 'WEAK_PASSWORD'
            }), 400
        
        # Check if user already exists
        existing_user = user_service.get_user_by_email(email)
        if existing_user:
            return jsonify({
                'error': 'User with this email already exists',
                'code': 'USER_EXISTS'
            }), 409
        
        # Create new user
        user_data = {
            'email': email,
            'password': password,
            'cgpa': data.get('cgpa'),
            'gre_score': data.get('gre_score'),
            'ielts_score': data.get('ielts_score'),
            'toefl_score': data.get('toefl_score'),
            'field_of_study': data.get('field_of_study'),
            'preferred_countries': data.get('preferred_countries'),
            'budget_min': data.get('budget_min'),
            'budget_max': data.get('budget_max')
        }
        
        new_user = user_service.create_user(user_data)
        
        # Create access and refresh tokens
        access_token = create_access_token(
            identity=str(new_user['id']),
            expires_delta=timedelta(hours=1)
        )
        refresh_token = create_refresh_token(
            identity=str(new_user['id']),
            expires_delta=timedelta(days=30)
        )
        
        return jsonify({
            'message': 'User registered successfully',
            'user': {
                'id': new_user['id'],
                'email': new_user['email']
            },
            'access_token': access_token,
            'refresh_token': refresh_token
        }), 201
        
    except Exception as e:
        return jsonify({
            'error': 'Registration failed',
            'code': 'REGISTRATION_ERROR',
            'details': str(e)
        }), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Firebase user login endpoint"""
    try:
        if not user_service:
            return jsonify({
                'error': 'User service not available',
                'code': 'SERVICE_UNAVAILABLE'
            }), 503
            
        data = request.get_json()
        
        # Validate required fields
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({
                'error': 'Email and password are required',
                'code': 'MISSING_CREDENTIALS'
            }), 400
        
        # Get email and password
        email = data.get('email', '').strip().lower()
        password = data.get('password')
        
        # Validate email format
        if not validate_email(email):
            return jsonify({
                'error': 'Invalid email format',
                'code': 'INVALID_EMAIL'
            }), 400
        
        # Verify user credentials
        user = user_service.verify_password(email, password)
        
        if not user:
            return jsonify({
                'error': 'Invalid email or password',
                'code': 'INVALID_CREDENTIALS'
            }), 401
        
        # Create access and refresh tokens
        access_token = create_access_token(
            identity=str(user['id']),
            expires_delta=timedelta(hours=1)
        )
        refresh_token = create_refresh_token(
            identity=str(user['id']),
            expires_delta=timedelta(days=30)
        )
        
        return jsonify({
            'message': 'Login successful',
            'user': {
                'id': user['id'],
                'email': user['email']
            },
            'access_token': access_token,
            'refresh_token': refresh_token
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Login failed',
            'code': 'LOGIN_ERROR',
            'details': str(e)
        }), 500


@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token endpoint"""
    try:
        current_user_id = get_jwt_identity()
        
        # Create new access token
        new_access_token = create_access_token(
            identity=str(current_user_id),
            expires_delta=timedelta(hours=1)
        )
        
        return jsonify({
            'access_token': new_access_token
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Token refresh failed',
            'code': 'REFRESH_ERROR'
        }), 500

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user information"""
    try:
        if not user_service:
            return jsonify({
                'error': 'User service not available',
                'code': 'SERVICE_UNAVAILABLE'
            }), 503
            
        current_user_id = get_jwt_identity()
        
        user = user_service.get_user_by_id(current_user_id)
        
        if not user:
            return jsonify({
                'error': 'User not found',
                'code': 'USER_NOT_FOUND'
            }), 404
        
        return jsonify({
            'user': user
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Failed to get user information',
            'code': 'USER_FETCH_ERROR',
            'details': str(e)
        }), 500

@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """Change user password"""
    try:
        if not user_service:
            return jsonify({
                'error': 'User service not available',
                'code': 'SERVICE_UNAVAILABLE'
            }), 503
            
        current_user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        if not data or not data.get('current_password') or not data.get('new_password'):
            return jsonify({
                'error': 'Current password and new password are required',
                'code': 'MISSING_FIELDS'
            }), 400
        
        current_password = data.get('current_password')
        new_password = data.get('new_password')
        
        # Validate new password strength
        is_valid, message = validate_password(new_password)
        if not is_valid:
            return jsonify({
                'error': message,
                'code': 'WEAK_PASSWORD'
            }), 400
        
        # Check if new password is same as current
        if current_password == new_password:
            return jsonify({
                'error': 'New password must be different from current password',
                'code': 'SAME_PASSWORD'
            }), 400
        
        # Get user and verify current password
        user = user_service.get_user_by_id(current_user_id)
        if not user:
            return jsonify({
                'error': 'User not found',
                'code': 'USER_NOT_FOUND'
            }), 404
        
        # Verify current password
        verified_user = user_service.verify_password(user['email'], current_password)
        if not verified_user:
            return jsonify({
                'error': 'Current password is incorrect',
                'code': 'INVALID_PASSWORD'
            }), 401
        
        # Update password
        success = user_service.update_user(current_user_id, {'password': new_password})
        
        if success:
            return jsonify({
                'message': 'Password changed successfully'
            }), 200
        else:
            return jsonify({
                'error': 'Failed to change password',
                'code': 'PASSWORD_CHANGE_ERROR'
            }), 500
        
    except Exception as e:
        return jsonify({
            'error': 'Password change failed',
            'code': 'PASSWORD_CHANGE_ERROR',
            'details': str(e)
        }), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """Logout endpoint (for logging purposes)"""
    try:
        current_user_id = get_jwt_identity()
        
        return jsonify({
            'message': 'Logged out successfully'
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': 'Logout failed',
            'code': 'LOGOUT_ERROR'
        }), 500