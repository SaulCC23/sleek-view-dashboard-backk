import React, { useState } from 'react';
import './Login.css';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    
    try {
      const response = await fetch("http://localhost/sys/validar.php", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Guardar el token y redirigir
          login(result.token);
          const from = (location.state as any)?.from?.pathname || '/';
          navigate(from, { replace: true });
        } else {
          alert(result.message || 'Credenciales inválidas');
        }
      } else {
        const result = await response.json();
        alert(result.message || 'Error en la autenticación');
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un problema al enviar los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundColor: 'white' }}>
      <div className="login-box">
        <div className="logo-container animate__animated animate__bounceIn">
          <img 
            src="/EJAD_LOGO.png" 
            alt="EJAD Global Solutions" 
            className="logo-image"
          />
        </div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              required
              disabled={isLoading}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            <span className="button-text">
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </span>
            {isLoading && <span className="spinner"></span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 