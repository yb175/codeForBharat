import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './AuthenticationPage.css';
import handleGoogleLogin from '../../myfunctions/login';

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    year: '',
    role: 'student'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.department) {
        newErrors.department = 'Department is required';
      }
      if (!formData.year) {
        newErrors.year = 'Year is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isLogin) {
        // Mock login - in real app, this would make an API call
        const mockUser = {
          id: '1',
          name: 'John Doe',
          email: formData.email,
          role: 'student',
          department: 'Computer Science',
          year: '3rd',
          points: 150
        };
        login(mockUser);
      } else {
        register(formData);
      }
    } catch (error) {
      setErrors({ general: 'Authentication failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1 className="auth-title">Campus Connect</h1>
          <p className="auth-subtitle">Your Digital Campus Ecosystem</p>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        
        <div className="auth-form-container">
          <div className="auth-toggle">
            <button 
              className={`auth-toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
        </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {errors.general && (
              <div className="error-message">{errors.general}</div>
            )}
            
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>
            
            {!isLogin && (
              <>
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`form-input ${errors.department ? 'error' : ''}`}
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                  </select>
                  {errors.department && <span className="error-text">{errors.department}</span>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className={`form-input ${errors.year ? 'error' : ''}`}
                  >
                    <option value="">Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                  {errors.year && <span className="error-text">{errors.year}</span>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>
              </>
            )}
            
            <button 
              type="submit" 
              className="btn btn-primary auth-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="spinner"></div>
                  {isLogin ? 'Logging in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Login' : 'Create Account'
              )}
            </button>
          </form>
          <div className="google-login">
              <button className="google-btn" onClick={()=>handleGoogleLogin()}>
            <img 
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" 
                alt="Google logo" 
                className="google-icon"
            />
              Login with Google
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;