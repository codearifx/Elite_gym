import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, Menu, X, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Membership', path: '/membership' }
  ];

  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, background: 'rgba(18, 18, 18, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(57, 255, 20, 0.2)' }}>
      <div className="container flex-between" style={{ height: '80px' }}>
        {/* Logo */}
        <Link to="/" className="flex-center" style={{ gap: '0.5rem' }}>
          <Dumbbell className="text-neon" size={32} />
          <h1 className="text-neon" style={{ fontSize: '1.5rem', margin: 0 }}>Elite Strength</h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} style={{ textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 500, transition: 'var(--transition)' }} className="nav-link">
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="btn-neon" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn-neon" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', borderColor: '#ff4444', color: '#ff4444' }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-neon" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
              Member Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" style={{ display: 'none', background: 'transparent', border: 'none', color: 'var(--neon-green)', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu inline styles handle */}
      {isOpen && (
        <div style={{ background: 'var(--bg-secondary)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid var(--neon-green)' }}>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} style={{ textTransform: 'uppercase', color: 'var(--text-main)', padding: '0.5rem 0' }}>
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setIsOpen(false)} style={{ color: 'var(--neon-green)' }}>
                Dashboard
              </Link>
              <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ff4444', textAlign: 'left', textTransform: 'uppercase', cursor: 'pointer', padding: '0.5rem 0', fontFamily: 'var(--font-heading)' }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-neon" style={{ padding: '0.5rem 0' }}>
              Member Login
            </Link>
          )}
        </div>
      )}

      {/* Basic Mobile Responsive Styles inside a style tag for simplicity but ideally in index.css */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        .nav-link:hover { color: var(--neon-green); text-shadow: 0 0 8px var(--neon-green-dim); }
      `}} />
    </nav>
  );
};

export default Navbar;
