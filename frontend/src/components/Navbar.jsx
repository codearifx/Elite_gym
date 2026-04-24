import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Dumbbell, Menu, X, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const handleNavClick = (e, path) => {
    if (path.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = path.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (path === '/' && location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Activities', path: '/#activities' },
    { name: 'Calculator', path: '/#calculator' },
    { name: 'Contact', path: '/contact' },
    { name: 'Elite', path: '/elite-squad' }
  ];

  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="container flex-between" style={{ height: '80px' }}>
        {/* Logo */}
        <Link to="/" className="flex-center" style={{ gap: '0.5rem' }}>
          <Dumbbell className="text-primary" size={32} />
          <h1 className="text-gradient font-heading font-bold" style={{ fontSize: '1.5rem', margin: 0 }}>Elite Strength</h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={(e) => handleNavClick(e, link.path)}
              style={{ textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 600, transition: 'var(--transition)' }} 
              className="nav-link text-gray-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', background: '#ef4444' }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
              Member Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" style={{ display: 'none', background: 'transparent', border: 'none', color: '#f8fafc', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ background: '#1e293b', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={(e) => handleNavClick(e, link.path)} 
              style={{ textTransform: 'uppercase', color: '#f8fafc', padding: '0.5rem 0', fontWeight: 600 }}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)} style={{ color: '#ec4899', fontWeight: 600 }}>
                Dashboard
              </Link>
              <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ef4444', textAlign: 'left', textTransform: 'uppercase', cursor: 'pointer', padding: '0.5rem 0', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} style={{ color: '#ec4899', padding: '0.5rem 0', fontWeight: 600 }}>
              Member Login
            </Link>
          )}
        </div>
      )}

      {/* Basic Mobile Responsive Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .nav-link:hover { color: #ec4899 !important; }
      `}} />
    </nav>
  );
};

export default Navbar;
