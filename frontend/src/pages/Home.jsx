import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-wrapper" style={{ paddingTop: 0 }}>
      {/* Hero Section */}
      <section style={{ height: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, var(--bg-secondary) 0%, var(--bg-color) 100%)', zIndex: -1 }}>
          {/* Abstract glowing shapes */}
          <div className="floating-element" style={{ position: 'absolute', top: '10%', left: '20%', width: '300px', height: '300px', background: 'var(--neon-green-dim)', borderRadius: '50%', filter: 'blur(100px)' }}></div>
          <div className="floating-element" style={{ position: 'absolute', bottom: '10%', right: '10%', width: '400px', height: '400px', background: 'var(--neon-green-dim)', borderRadius: '50%', filter: 'blur(120px)', animationDelay: '2s' }}></div>
        </div>

        <div className="container" style={{ textAlign: 'center', zIndex: 1 }}>
          <h1 className="text-neon floating-element" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1, marginBottom: '1.5rem', textTransform: 'uppercase', fontStyle: 'italic', fontWeight: 800 }}>
            Unleash Your<br />Strength
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Enter the anti-gravity zone. Experience futuristic training, elite equipment, and a community forged in neon and steel.
          </p>
          <div className="flex-center" style={{ gap: '1.5rem' }}>
            <Link to="/register" className="btn-neon" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>Join Now</Link>
            <Link to="/services" style={{ color: 'var(--text-main)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '1px', transition: 'var(--transition)' }} className="text-neon">Explore Programs</Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-3">
            {[1,2,3].map((item) => (
              <div key={item} className="glass-panel anti-gravity" style={{ textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', background: 'var(--neon-green-dim)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <span className="text-neon" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>0{item}</span>
                </div>
                <h3 style={{ marginBottom: '1rem', color: 'var(--neon-green)' }}>{item === 1 ? 'Elite Tech' : item === 2 ? 'Pro Trainers' : '24/7 Access'}</h3>
                <p className="text-muted">State-of-the-art facilities designed for maximum performance and strength conditioning.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
