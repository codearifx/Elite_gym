import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await register(formData);
      setSuccess('Registration successful. Your account is pending admin approval.');
      setFormData({ name: '', email: '', password: '' });
      setTimeout(() => navigate('/login'), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper flex-center container">
      <div className="glass-panel anti-gravity" style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}>
        <h2 className="text-neon" style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2rem' }}>Request Access</h2>
        <p className="text-muted" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>Accounts must be approved by Administration.</p>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Full Name</label>
            <input type="text" name="name" className="input-field" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Email ID</label>
            <input type="email" name="email" className="input-field" placeholder="email@example.com" required value={formData.email} onChange={handleChange} />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Password</label>
            <input type="password" name="password" className="input-field" placeholder="Create a secure password" required minLength="6" value={formData.password} onChange={handleChange} />
          </div>
          
          <button type="submit" className="btn-neon" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <p className="text-muted">Already approved?</p>
          <Link to="/login" className="text-neon" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Login Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
