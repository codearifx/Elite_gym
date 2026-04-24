import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login({ email: credentials.username, password: credentials.password });
      
      setShowPopup(true);
      setTimeout(() => {
          setShowPopup(false);
          // Redirect to Home page after success as requested
          navigate('/');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4 relative">
      {/* Success Popup logic */}
      {showPopup && (
         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-neon/20 border border-neon text-neon px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.5)] z-50 animate-bounce">
            <h3 className="text-xl font-heading font-bold uppercase">Login Successful!</h3>
         </div>
      )}

      <div className="w-full max-w-md bg-surface/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <h2 className="text-3xl text-center text-neon font-heading uppercase mb-6 text-shadow-neon">Login</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Username</label>
            <input 
              type="text" 
              name="username" 
              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition" 
              placeholder="Enter your username" 
              required 
              value={credentials.username} 
              onChange={handleChange} 
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition" 
              placeholder="Enter password" 
              required 
              value={credentials.password} 
              onChange={handleChange} 
            />
          </div>
          
          <button type="submit" className="w-full py-3 px-6 mt-6 border-2 border-neon text-neon uppercase font-heading font-bold rounded-full hover:bg-neon hover:text-background transition-all shadow-[0_0_15px_rgba(57,255,20,0.5)] disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 mb-2">Don't have an account?</p>
          <Link to="/register" className="text-neon hover:underline">Register Here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
