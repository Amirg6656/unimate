// src/components/common/Card.jsx
import './Card.css';

function Card({ children, title, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;