import React from 'react';

const Services = () => {
  const services = [
    { title: 'Cardio Core', desc: 'High-intensity interval training for maximum calorie burn.', icon: '🏃' },
    { title: 'Weight Training', desc: 'Powerlifting and bodybuilding equipment with spotter assistance.', icon: '🏋️' },
    { title: 'Yoga & Flexibility', desc: 'Active recovery and advanced stretching routines.', icon: '🧘' },
    { title: 'Personal Training', desc: '1-on-1 sessions with elite coaches.', icon: '🎯' }
  ];

  return (
    <div className="page-wrapper container section-padding">
      <h2 className="text-neon" style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Our Services</h2>
      
      <div className="grid-3">
        {services.map((service, index) => (
          <div key={index} className="glass-panel anti-gravity" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{service.icon}</div>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>{service.title}</h3>
            <p className="text-muted">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
