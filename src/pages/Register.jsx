// src/pages/Register.jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const { role } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    password: '',
    confirmPassword: '',
    educationLevel: '',
    fieldOfStudy: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // اعتبارسنجی لحظه‌ای تکرار رمز عبور
    if (name === 'confirmPassword' || name === 'password') {
      if (name === 'confirmPassword') {
        if (formData.password !== value) {
          setPasswordError('رمز عبور و تکرار آن مطابقت ندارند');
        } else {
          setPasswordError('');
        }
      } else if (name === 'password') {
        if (formData.confirmPassword && formData.confirmPassword !== value) {
          setPasswordError('رمز عبور و تکرار آن مطابقت ندارند');
        } else {
          setPasswordError('');
        }
      }
    }
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('رمز عبور و تکرار آن مطابقت ندارند');
      return false;
    }
    
    if (formData.password.length < 8) {
      setPasswordError('رمز عبور باید حداقل ۸ کاراکتر باشد');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) {
      return;
    }
    
    console.log('فرم ثبت نام ارسال شد:', formData);
    alert('ثبت نام با موفقیت انجام شد!');
  };

  const goBack = () => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="register-container">
      {/* عکس پس‌زمینه اصلی */}
      <div className="main-background"></div>
      
      {/* کانتینر دو باکس */}
      <div className="boxes-container">
        {/* باکس سمت راست - عکس و لوگو */}
        <div className="right-box">
          <div className="overlay"></div>
          <div className="content-wrapper">
            <img src="/src/assets/images/logo.png" alt="Logo" className="university-logo" />
            <h1 className="university-title">
              IMAM KHOMEINI<br />
              INTERNATIONAL UNIVERSITY
            </h1>
          </div>
        </div>

        {/* باکس سمت چپ - فرم ثبت نام */}
        <div className="left-box">
          {/* دکمه بازگشت - خارج از form-wrapper */}
          <div className="back-btn-container">
            <button onClick={goBack} className="back-btn">
              ← بازگشت
            </button>
          </div>
          
          <div className="form-wrapper">
            <h1 className="register-title">ایجاد حساب کاربری</h1>
            <p className="register-subtitle">لطفا اطلاعات زیر را با دقت وارد کنید</p>

            <form onSubmit={handleSubmit} className="register-form">
              {/* ردیف اول: نام و نام خانوادگی */}
              <div className="form-row">
                <div className="form-group">
                  <label>نام</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="نام"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>نام خانوادگی</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="نام خانوادگی"
                    required
                  />
                </div>
              </div>

              {/* ردیف دوم: جنسیت - تمام عرض */}
              <div className="form-group full-width">
                <label>جنسیت</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                  required
                >
                  <option value="">انتخاب کنید</option>
                  <option value="male">مرد</option>
                  <option value="female">زن</option>
                </select>
              </div>

              {/* ردیف سوم: رمز عبور و تکرار رمز عبور */}
              <div className="form-row">
                <div className="form-group">
                  <label>رمز عبور</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={validatePasswords}
                    placeholder="رمز عبور"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>تکرار رمز عبور</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={validatePasswords}
                    placeholder="تکرار رمز عبور"
                    required
                  />
                </div>
              </div>

              {/* نمایش خطای رمز عبور */}
              {passwordError && (
                <span className="error-message">
                  {passwordError}
                </span>
              )}

              {/* ردیف چهارم: مقطع تحصیلی - تمام عرض */}
              <div className="form-group full-width">
                <label>مقطع تحصیلی</label>
                <select 
                  name="educationLevel" 
                  value={formData.educationLevel} 
                  onChange={handleChange}
                  required
                >
                  <option value="">انتخاب کنید</option>
                  <option value="bachelor">کارشناسی</option>
                  <option value="master">کارشناسی ارشد</option>
                  <option value="phd">دکتری</option>
                </select>
              </div>

              {/* ردیف پنجم: رشته تحصیلی - تمام عرض */}
              <div className="form-group full-width">
                <label>رشته تحصیلی</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  placeholder="مثال: مهندسی کامپیوتر"
                  required
                />
              </div>

              {/* دکمه ثبت نام */}
              <button type="submit" className="register-btn">
                ثبت نام
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;