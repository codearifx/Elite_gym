import React from 'react';

const Trainers = () => {
  const trainers = [
    { name: 'Alex Vance', spec: 'Powerlifting', exp: '10 Yrs', img: 'https://vezlay.com/blog/wp-content/uploads/2023/04/Abhishek-Thevar%E2%80%8B.jpg' },
    { name: 'Sarah Connor', spec: 'HIIT & Cardio', exp: '8 Yrs', img: 'https://studyactive.co.uk/cdn/shop/articles/iStock-2106554367.jpg?v=1744120384' },
    { name: 'Jack Reacher', spec: 'Bodybuilding', exp: '15 Yrs', img: 'https://img.freepik.com/free-photo/attractive-bodybuilder-performing-strong-body-sport-gym_7502-10718.jpg?semt=ais_hybrid&w=740&q=80' }
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
