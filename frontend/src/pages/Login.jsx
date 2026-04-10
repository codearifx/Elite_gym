import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(credentials);
      if (user.role === 'admin') navigate('/admin');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper flex-center container">
      <div className="glass-panel anti-gravity" style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}>
        <h2 className="text-neon" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Access Portal</h2>
        
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>ID / Email</label>
            <input 
              type="email" 
              name="email" 
              className="input-field" 
              placeholder="Enter your registered email" 
              required 
              value={credentials.email} 
              onChange={handleChange} 
            />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
            <input 
              type="password" 
              name="password" 
              className="input-field" 
              placeholder="Enter password" 
              required 
              value={credentials.password} 
              onChange={handleChange} 
            />
          </div>
          
          <button type="submit" className="btn-neon" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <p className="text-muted">No valid ID yet?</p>
          <Link to="/register" className="text-neon" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Request Access (Register)</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
