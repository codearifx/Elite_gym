import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <div className="page-wrapper py-16">
      <div className="container max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-heading font-black text-gradient uppercase mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">We're here to help you reach your maximum potential. Get in touch with our elite team today.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side: Contact Info */}
          <div className="glass-panel p-8 md:p-12 h-full">
            <h2 className="text-3xl font-heading font-bold text-white mb-8 border-b border-white/10 pb-4">Gym Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Our Location</h3>
                  <p className="text-gray-400">123 Fitness Boulevard<br />Muscle City, MC 90210<br />United States</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <Phone className="text-secondary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Phone Number</h3>
                  <p className="text-gray-400">+1 (555) 123-4567<br />Mon-Fri, 6am-10pm</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <Mail className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Email Address</h3>
                  <p className="text-gray-400">support@elitestrength.com<br />info@elitestrength.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">Follow Our Journey</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors font-bold text-sm text-gray-300">
                  FB
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors font-bold text-sm text-gray-300">
                  IG
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-colors font-bold text-sm text-gray-300">
                  X
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="glass-panel p-8 md:p-12 hover-glass">
            <h2 className="text-3xl font-heading font-bold text-white mb-8 border-b border-white/10 pb-4">Message Us</h2>
            
            {submitted && (
              <div className="bg-green-500/20 border border-green-500 text-green-400 p-4 rounded-lg mb-6 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 Message sent successfully! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="input-field m-0"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-300 font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="input-field m-0"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-300 font-medium mb-2">Message</label>
                <textarea 
                  required
                  rows="4"
                  className="input-field m-0 resize-none"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary w-full flex justify-center gap-2 mt-4 text-lg py-4">
                <Send size={20} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
