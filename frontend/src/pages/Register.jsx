import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
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

    if (formData.password !== formData.confirmPassword) {
        return setError("Passwords do not match!");
    }

    setLoading(true);
    try {
      // mapping username to both name and email for backend requirements
      await register({ name: formData.username, email: formData.username, password: formData.password });
      setSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <h2 className="text-3xl text-center text-neon font-heading uppercase mb-2 text-shadow-neon">Register</h2>
        <p className="text-gray-400 text-center mb-6 text-sm">Join the Elite Squad</p>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">{error}</div>}
        {success && <div className="bg-neon/10 border border-neon text-neon p-3 rounded-lg mb-4">{success}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Username</label>
            <input 
                type="text" 
                name="username" 
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition" 
                placeholder="Enter your username" 
                required 
                value={formData.username} 
                onChange={handleChange} 
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Password</label>
            <input 
                type="password" 
                name="password" 
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition" 
                placeholder="Create a password" 
                required 
                minLength="6" 
                value={formData.password} 
                onChange={handleChange} 
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Confirm Password</label>
            <input 
                type="password" 
                name="confirmPassword" 
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition" 
                placeholder="Re-enter password" 
                required 
                minLength="6" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
            />
          </div>
          
          <button type="submit" className="w-full py-3 px-6 mt-6 border-2 border-neon text-neon uppercase font-heading font-bold rounded-full hover:bg-neon hover:text-background transition-all shadow-[0_0_15px_rgba(57,255,20,0.5)] disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 mb-2">Already have an account?</p>
          <Link to="/login" className="text-neon hover:underline">Login Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
