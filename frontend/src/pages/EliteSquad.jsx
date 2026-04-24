import React, { useState } from 'react';
import { Trophy, Star, ArrowRight, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EliteSquad = () => {
  const [verifyForm, setVerifyForm] = useState({ name: '', email: '', date: '', gymId: '' });
  const [verifyStatus, setVerifyStatus] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    const { name, email, date, gymId } = verifyForm;
    // Mock Validation logic against sample user
    if (
      name.toLowerCase() === 'arif' &&
      email.toLowerCase() === 'arifus34@gmail.com' &&
      date === '02/04/2026' && // User prompt format
      gymId.toUpperCase() === 'OMG023'
    ) {
      setVerifyStatus('success');
    } else {
      setVerifyStatus('error');
    }
  };

  return (
    <div className="page-wrapper pt-24 pb-16">
      
      {/* 1. Member Verification System */}
      <section className="container max-w-4xl mb-24">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-heading font-black text-gradient uppercase mb-4">Elite <span className="text-white">Squad</span></h1>
          <p className="text-gray-400 text-lg">Verify your membership to unlock exclusive features.</p>
        </div>

        <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            
            <div className="md:w-1/2 w-full">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-2">
                <ShieldCheck className="text-primary" /> Member Verification
              </h2>
              <form onSubmit={handleVerify} className="space-y-4">
                <input type="text" placeholder="Name" required className="input-field" value={verifyForm.name} onChange={e => setVerifyForm({...verifyForm, name: e.target.value})} />
                <input type="email" placeholder="Email" required className="input-field" value={verifyForm.email} onChange={e => setVerifyForm({...verifyForm, email: e.target.value})} />
                <input type="text" placeholder="Date (DD/MM/YYYY)" required className="input-field" value={verifyForm.date} onChange={e => setVerifyForm({...verifyForm, date: e.target.value})} />
                <input type="text" placeholder="Gym ID" required className="input-field" value={verifyForm.gymId} onChange={e => setVerifyForm({...verifyForm, gymId: e.target.value})} />
                <button type="submit" className="w-full btn-primary py-3">Verify Identity</button>
              </form>

              <AnimatePresence>
                {verifyStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-green-500/20 border border-green-500 text-green-400 flex items-center gap-3">
                    <CheckCircle2 size={24} /> <span className="font-bold">Verified Member ✅</span>
                  </motion.div>
                )}
                {verifyStatus === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-red-500/20 border border-red-500 text-red-400 flex items-center gap-3">
                    <XCircle size={24} /> <span className="font-bold">Not Registered ❌</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="md:w-1/2 w-full border-l border-white/10 md:pl-12">
               <h3 className="text-lg font-bold text-white mb-4">Why Verify?</h3>
               <ul className="space-y-3 text-gray-400 text-sm">
                 <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" /> Access your personal activity dashboard & stats history.</li>
                 <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" /> Unlock premium gym entry features and class bookings.</li>
                 <li className="flex gap-2 items-start"><CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" /> Special discounts on Elite plans and merchandise.</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Upgrade to Elite Plans */}
      <section className="container max-w-5xl mb-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-white mb-4 uppercase">Upgrade to <span className="text-gradient">Elite Plans</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Take your fitness journey to the absolute next level with an Elite subscription.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 3 Months Plan */}
          <motion.div whileHover={{ y: -10 }} className="glass-panel p-8 md:p-10 border border-white/10 hover:border-primary/50 relative overflow-hidden group">
            <h3 className="text-2xl font-heading font-bold text-white mb-2">Quarterly Elite</h3>
            <p className="text-gray-400 mb-6 border-b border-white/10 pb-6">3 Months Access</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-white">₹999</span>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-gray-300">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> Advanced Metrics Tracking</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> 1-on-1 Diet Consultation</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> Free Gym Merchandise Starter Kit</li>
            </ul>
            <button className="w-full btn-primary py-4 uppercase font-bold tracking-wider group-hover:shadow-[0_10px_25px_rgba(236,72,153,0.4)]">Upgrade Now</button>
          </motion.div>

          {/* Yearly Plan */}
          <motion.div whileHover={{ y: -10 }} className="glass-panel p-8 md:p-10 border-2 border-primary relative overflow-hidden group">
             {/* Best Value Badge */}
            <div className="absolute top-6 right-[-30px] bg-primary text-white text-xs font-bold py-1 px-10 rotate-45">BEST VALUE</div>
            
            <h3 className="text-2xl font-heading font-bold text-white mb-2">Yearly Elite</h3>
            <p className="text-gray-400 mb-6 border-b border-white/10 pb-6">12 Months Access</p>
            <div className="mb-8">
              <span className="text-5xl font-black text-gradient">₹3000</span>
              <span className="text-gray-500 text-sm ml-2 line-through">₹3996</span>
            </div>
            <ul className="space-y-4 mb-8 text-sm text-gray-300">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> Everything in Quarterly</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> VIP Access to all Gym Locations</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> Dedicated Personal Trainer</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-primary" /> Priority Class Booking</li>
            </ul>
            <button className="w-full btn-primary py-4 uppercase font-bold tracking-wider group-hover:shadow-[0_10px_25px_rgba(236,72,153,0.4)]">Upgrade Now</button>
          </motion.div>
        </div>
      </section>

      {/* 3. Motivation Section */}
      <section className="container max-w-5xl">
        <div 
          className="relative rounded-3xl overflow-hidden shadow-2xl p-12 md:p-20 text-center bg-slate-900 border border-white/10 group bg-cover bg-center"
          style={{ backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&auto=format&fit=crop")'}}
        >
          <div className="relative z-10 flex flex-col items-center">
            <Trophy className="text-accent mb-6 bg-slate-900/50 p-3 rounded-full border border-white/10" size={64} />
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-6 uppercase tracking-wider">Ready to Reach the Top?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Stop making excuses. It's time to build the physique of your dreams. Join Elite Squad today and discover what you are truly capable of.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="bg-white text-slate-900 px-10 py-5 font-bold font-heading uppercase tracking-widest text-lg rounded-full flex items-center gap-3 hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              Start Elite Journey <ArrowRight size={24} />
            </motion.button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EliteSquad;
