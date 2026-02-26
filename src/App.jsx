// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleSelect from './pages/RoleSelect';
import LoginForm from './pages/LoginForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {/* صفحه انتخاب نقش (همون صفحه اول) */}
          <Route path="/" element={<RoleSelect />} />
          
          {/* صفحه فرم لاگین - با پارامتر نقش */}
          <Route path="/login/:role" element={<LoginForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;