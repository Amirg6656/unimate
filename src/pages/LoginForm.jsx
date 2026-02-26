// src/pages/LoginForm.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
  const { role } = useParams(); // گرفتن نقش از آدرس
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('نقش انتخاب شده:', role);
    console.log('فرم ارسال شد:', formData);
    
    // اینجا بعداً به بک‌اند وصل میشه
    alert(`در حال ورود به عنوان ${role === 'admin' ? 'ادمین' : 'دانشجو'}...`);
  };

  // دکمه برگشت به صفحه انتخاب نقش
  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="login-form-container">
      <div className="background-image"></div>
      
      <div className="login-form-box">
        {/* دکمه برگشت */}
        <button onClick={goBack} className="back-btn">
          ← بازگشت
        </button>

        <div className="university-header">
          <img src="/src/assets/images/logo.png" alt="Logo" className="university-logo" />
          <h1 className="university-title">
            IMAM KHOMEINI<br />
            INTERNATIONAL UNIVERSITY
          </h1>
        </div>

        {/* نمایش نقش انتخاب شده */}
        <div className="selected-role">
          ورود به عنوان: <span>{role === 'admin' ? 'ادمین' : 'دانشجو'}</span>
        </div>

        <hr className="divider" />

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">نام کاربری</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="نام کاربری خود را وارد کنید"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">رمز عبور</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="رمز عبور خود را وارد کنید"
              required
            />
          </div>

          <button type="submit" className="login-submit-btn">
            ورود
          </button>
        </form>

        <div className="login-links">
          <a href="#" className="forgot-password">فراموشی رمز عبور</a>
          <a href="#" className="create-account">ساخت حساب کاربری</a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;