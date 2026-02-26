// src/components/common/Button.jsx
import './Button.css';

function Button({ children, type = 'primary', onClick, size = 'medium' }) {
  return (
    <button 
      className={`btn btn-${type} btn-${size}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;