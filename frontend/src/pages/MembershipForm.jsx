import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MembershipForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    subject: 'Membership Inquiry',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate passing some context to payment page, 
    // or just directly route since payment will handle logic
    navigate('/payment');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background relative px-4">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container max-w-3xl mx-auto relative z-10">
        <div className="bg-surface/80 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-heading text-white uppercase italic">Complete Your <span className="text-neon drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">Profile</span></h1>
            <p className="text-gray-400 mt-3 font-mono">Fill out the details below to proceed to the payment gateway.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2 font-mono text-sm uppercase tracking-wider">First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" 
                  placeholder="John" 
                  required 
                  value={formData.firstName} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-mono text-sm uppercase tracking-wider">Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" 
                  placeholder="Doe" 
                  required 
                  value={formData.lastName} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2 font-mono text-sm uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" 
                  placeholder="john@example.com" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-mono text-sm uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" 
                  placeholder="+1 (555) 000-0000" 
                  required 
                  value={formData.phone} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-400 mb-2 font-mono text-sm uppercase tracking-wider">Location</label>
                <input 
                  type="text" 
                  name="location" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all" 
                  placeholder="City, Country" 
                  required 
                  value={formData.location} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-400 mb-2 font-mono text-sm uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all opacity-80" 
                  required 
                  value={formData.subject} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-400 mb-2 font-mono text-sm uppercase tracking-wider">Message / Goals</label>
                <textarea 
                  name="message" 
                  rows="4"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all resize-none" 
                  placeholder="Tell us a bit about your fitness goals..." 
                  required 
                  value={formData.message} 
                  onChange={handleChange} 
                ></textarea>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-white/10 mt-6 md:flex-row flex-col gap-4 md:gap-0">
               <p className="text-gray-400 text-sm">Secure Checkout on the next step</p>
               <button type="submit" className="w-full md:w-auto px-10 py-4 bg-neon hover:bg-white text-background hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] uppercase font-black tracking-widest rounded-full transition-all">
                  Proceed to Pay
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
