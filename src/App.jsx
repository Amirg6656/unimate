// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleSelect from './pages/RoleSelect';
import LoginForm from './pages/LoginForm';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<RoleSelect />} />
          <Route path="/login/:role" element={<LoginForm />} />
          <Route path="/register/:role" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;