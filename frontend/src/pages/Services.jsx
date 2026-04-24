import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    { id: 'cardio', title: 'Cardio', desc: 'High-intensity interval training for maximum calorie burn.', icon: '🏃‍♂️', img: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=80' },
    { id: 'core-training', title: 'Core Training', desc: 'Build rock solid abs and improve overall stability.', icon: '🔥', img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80' },
    { id: 'weight-training', title: 'Weight Training', desc: 'Powerlifting and bodybuilding equipment with spotter assistance.', icon: '🏋️', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80' },
    { id: 'yoga-flexibility', title: 'Yoga & Flexibility', desc: 'Active recovery and advanced stretching routines.', icon: '🧘‍♀️', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80' },
    { id: 'personal-training', title: 'Personal Training', desc: '1-on-1 sessions with elite coaches.', icon: '🎯', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background relative px-4">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-neon/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-heading text-white uppercase italic text-center mb-4">Elite <span className="text-neon drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">Services</span></h1>
        <p className="text-gray-400 text-center mb-16 text-lg">Select a program to read full details and commit.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              to={`/services/${service.id}`} 
              key={service.id} 
              className="group relative h-[350px] rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all duration-500 hover:-translate-y-2 block"
            >
               {/* Background Image */}
               <img src={service.img} alt={service.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-40" />
               
               {/* Gradient Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
               <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon/50 rounded-3xl transition-colors duration-500"></div>

               {/* Content */}
               <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="bg-black/50 w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-4 border border-white/20 group-hover:border-neon group-hover:bg-neon/20 transition-all backdrop-blur-sm">
                     {service.icon}
                  </div>
                  <h3 className="text-2xl font-heading text-white uppercase mb-2 group-hover:text-neon transition-colors">{service.title}</h3>
                  <p className="text-gray-300 font-mono text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                     {service.desc}
                  </p>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
