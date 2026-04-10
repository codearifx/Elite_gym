import React from 'react';

const Trainers = () => {
  const trainers = [
    { name: 'Alex Vance', spec: 'Powerlifting', exp: '10 Yrs', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Sarah Connor', spec: 'HIIT & Cardio', exp: '8 Yrs', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Jack Reacher', spec: 'Bodybuilding', exp: '15 Yrs', img: 'https://images.unsplash.com/photo-1567013127596-f90b9f1d0ac7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="page-wrapper container section-padding">
      <h2 className="text-neon" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Elite Trainers</h2>
      
      <div style={{ marginBottom: '2rem' }}>
         <input type="text" className="input-field" placeholder="Search trainers by name or specialization..." style={{ maxWidth: '500px', margin: '0 auto', display: 'block' }}/>
      </div>

      <div className="grid-3">
        {trainers.map((trainer, index) => (
          <div key={index} className="glass-panel anti-gravity" style={{ padding: 0, overflow: 'hidden' }}>
            <img src={trainer.img} alt={trainer.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            <div style={{ padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--neon-green)', marginBottom: '0.5rem' }}>{trainer.name}</h3>
              <p className="text-muted" style={{ fontWeight: 600 }}>{trainer.spec}</p>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>Exp: {trainer.exp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
