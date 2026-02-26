// src/pages/RoleSelect.jsx
import { useNavigate } from 'react-router-dom';
import './RoleSelect.css';

function RoleSelect() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="role-select-container">
      <div className="background-image"></div>
      
      <div className="role-box">
        <div className="university-header">
          <img src="/src/assets/images/logo.png" alt="Logo" className="university-logo" />
          <h1 className="university-title">
            IMAM KHOMEINI<br />
            INTERNATIONAL UNIVERSITY
          </h1>
        </div>

        <h2 className="welcome-text">خوش آمدید</h2>

        <div className="role-section">
          <p className="role-label">: ورود به عنوان</p>
          <div className="role-buttons">
            <button 
              className="role-btn"
              onClick={() => handleRoleSelect('admin')}
            >
              ادمین
            </button>
            <button 
              className="role-btn"
              onClick={() => handleRoleSelect('student')}
            >
              دانشجو
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;