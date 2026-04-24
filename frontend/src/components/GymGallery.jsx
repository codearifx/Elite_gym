import React from 'react';

const galleryImages = [
  "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
];

const GymGallery = () => {
  return (
    <section className="py-24 bg-background border-t border-white/5 relative z-10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-white mb-4 uppercase">Elite <span className="text-gradient">Gallery</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Step inside our world-class facilities designed for peak performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <div key={index} className="relative h-64 md:h-80 rounded-2xl overflow-hidden group">
              <img 
                src={src} 
                alt={`Gym facility ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white font-bold tracking-widest uppercase border border-white/30 px-6 py-2 rounded-full backdrop-blur-sm">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GymGallery;
