import React from 'react';
import { Link } from 'react-router-dom';

const Membership = () => {
  return (
    <div className="page-wrapper container section-padding">
      <h2 className="text-neon" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Choose Your Arsenal</h2>
      
      <div className="flex-center" style={{ gap: '2rem', flexWrap: 'wrap' }}>
        <div className="glass-panel anti-gravity" style={{ width: '100%', maxWidth: '350px', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.5rem' }}>Monthly</h3>
          <p className="text-neon" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>$49<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/mo</span></p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-muted)', lineHeight: '2.5' }}>
             <li>Full Access 24/7</li>
             <li>Locker Room & Showers</li>
             <li>Standard Equipment</li>
          </ul>
          <Link to="/register" className="btn-neon" style={{ width: '100%' }}>Select Plan</Link>
        </div>

        <div className="glass-panel anti-gravity" style={{ width: '100%', maxWidth: '350px', textAlign: 'center', border: '1px solid var(--neon-green)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--neon-green)', color: 'var(--bg-color)', padding: '0.2rem 1rem', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8.5rem', textTransform: 'uppercase' }}>Most Popular</div>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.5rem' }}>Yearly Elite</h3>
          <p className="text-neon" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>$399<span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/yr</span></p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-muted)', lineHeight: '2.5' }}>
             <li>Everything in Monthly</li>
             <li>2 Personal Training Sessions</li>
             <li>Nutrition Plan Access</li>
          </ul>
          <Link to="/register" className="btn-neon" style={{ width: '100%' }}>Select Plan</Link>
        </div>
      </div>
    </div>
  );
};

export default Membership;
