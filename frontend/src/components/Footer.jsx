import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

const Footer = () => {
  const location = useLocation();

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
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Activities', path: '/#activities' },
    { name: 'Calculator', path: '/#calculator' },
    { name: 'Contact', path: '/contact' },
    { name: 'Elite', path: '/elite-squad' }
  ];

  return (
    <footer className="bg-surface py-16 border-t border-white/5 relative z-20">
      <div className="container grid md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <Link to="/" className="flex items-center gap-2 mb-4 group" onClick={(e) => handleNavClick(e, '/')}>
            <Dumbbell className="text-primary group-hover:rotate-12 transition-transform" size={32} />
            <h2 className="text-2xl font-heading font-black text-white uppercase tracking-wider">Elite <span className="text-gradient">Strength</span></h2>
          </Link>
          <p className="text-gray-400 max-w-sm mt-4 text-lg">
            Modern tracking. Elite coaching. Proven results. Join the future of fitness today and unlock your true potential.
          </p>
        </div>
        
        <div className="md:col-span-3">
          <h3 className="text-lg font-heading font-bold text-white mb-6 uppercase tracking-wider flex items-center ">
            <span className="w-8 h-1 bg-primary mr-3 inline-block"></span> Navigation
          </h3>
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  onClick={(e) => handleNavClick(e, link.path)}
                  className="text-gray-400 hover:text-white hover:translate-x-1 inline-flex transition-all font-medium uppercase text-sm tracking-wide"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-4">
          <h3 className="text-lg font-heading font-bold text-white mb-6 uppercase tracking-wider flex items-center">
            <span className="w-8 h-1 bg-primary mr-3 inline-block"></span> Connect
          </h3>
          <ul className="flex flex-col gap-3 text-gray-400">
             <li className="flex items-start gap-3">
                 <span className="text-primary mt-1">•</span> 
                 <span>123 Fitness Ave, Iron City, IC 90210</span>
             </li>
             <li className="flex items-start gap-3">
                 <span className="text-primary mt-1">•</span> 
                 <span>support@elitestrength.com</span>
             </li>
             <li className="flex items-start gap-3">
                 <span className="text-primary mt-1">•</span> 
                 <span>+1 (555) 123-4567</span>
             </li>
          </ul>
        </div>
      </div>
      <div className="container mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Elite Strength. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all">
             IN
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all">
             FB
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
