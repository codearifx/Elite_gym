import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Activity, Footprints, Bike, TreePine, Timer, Flame, Play, Square, RotateCcw, CheckCircle2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

import ReviewCarousel from '../components/ReviewCarousel';
import ActivitiesSection from '../components/ActivitiesSection';
import FitnessCalculator from '../components/FitnessCalculator';
import AnimatedBackground from '../components/AnimatedBackground';
import GymGallery from '../components/GymGallery';

const activities = [
  { id: 'walking', name: 'Walking', icon: Footprints, desc: 'A steady pace for sustained endurance and fat burn.', color: 'text-blue-500' },
  { id: 'running', name: 'Running', icon: Activity, desc: 'High-intensity cardiovascular pushing limits.', color: 'text-purple-500' },
  { id: 'cycling', name: 'Cycling', icon: Bike, desc: 'Low-impact, high-reward leg day on wheels.', color: 'text-pink-500' },
  { id: 'outdoor', name: 'Outdoor Activities', icon: TreePine, desc: 'Functional fitness out in the real world.', color: 'text-green-500' }
];

const Dashboard = ({ activeActivity, onReset }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    let interval = null;
    let metricInterval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      metricInterval = setInterval(() => {
        if(activeActivity === 'walking' || activeActivity === 'running') {
            setSteps(s => s + (activeActivity === 'running' ? 3 : 1));
        }
        setCalories(c => +(c + (activeActivity === 'cycling' ? 0.2 : 0.1)).toFixed(1));
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      clearInterval(metricInterval);
    }
    return () => {
        clearInterval(interval);
        clearInterval(metricInterval);
    };
  }, [isActive, seconds, activeActivity]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setSeconds(0);
    setSteps(0);
    setCalories(0);
  };
  
  const formatTime = (totalSeconds) => {
    const getSeconds = `0${(totalSeconds % 60)}`.slice(-2);
    const minutes = `${Math.floor(totalSeconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(totalSeconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="glass-panel p-8 mt-10 max-w-4xl mx-auto border border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h2 className="text-3xl font-heading font-bold text-white capitalize flex items-center gap-3">
          <Activity className="text-secondary" /> {activeActivity} Tracking
        </h2>
        <button onClick={onReset} className="text-gray-400 hover:text-white transition-colors">
          Change Activity
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
            <Timer className="text-blue-500 mb-3" size={32} />
            <p className="text-gray-400 font-medium mb-1">Time Elapsed</p>
            <p className="text-4xl font-mono text-white font-bold">{formatTime(seconds)}</p>
        </div>
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
            <Footprints className="text-pink-500 mb-3" size={32} />
            <p className="text-gray-400 font-medium mb-1">Steps Simulated</p>
            <p className="text-4xl font-mono text-white font-bold">{steps}</p>
        </div>
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center">
            <Flame className="text-orange-500 mb-3" size={32} />
            <p className="text-gray-400 font-medium mb-1">Calories Burned</p>
            <p className="text-4xl font-mono text-white font-bold">{calories}</p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={toggle} className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold uppercase transition-all ${isActive ? 'bg-red-500/20 text-red-500 border-2 border-red-500 hover:bg-red-500 hover:text-white' : 'bg-primary/20 text-primary border-2 border-primary hover:bg-primary hover:text-white'}`}>
          {isActive ? <><Square size={20} /> Stop</> : <><Play size={20} /> Start</>}
        </button>
        <button onClick={reset} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold uppercase bg-slate-700 text-white hover:bg-slate-600 transition-all">
          <RotateCcw size={20} /> Reset
        </button>
      </div>
    </div>
  );
};


const Home = () => {
  const { user } = useContext(AuthContext);
  const [activeActivity, setActiveActivity] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const handleStartActivity = (id) => {
      setActiveActivity(id);
  };

  return (
    <div className="pt-[80px]">
      {/* Hero Section Container */}
      <section className="relative pb-24 overflow-hidden bg-background">
        <AnimatedBackground />
        
        {/* First Block: Left Text, Right Image */}
        <div className="container relative z-10 px-4 pt-32 lg:pt-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold uppercase tracking-wider mb-6 text-primary">
                Welcome to the future of fitness
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black uppercase mb-6 leading-tight text-white drop-shadow-md">
                Elevate Your <br />
                <span className="text-gradient">Performance</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-xl font-body">
                Modern tracking. Elite coaching. Proven results. Start your journey today and unlock your true potential.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="#activities" className="btn-primary text-lg px-10 py-5">
                  Start Tracking Now
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
               <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
               <img src="https://img.freepik.com/free-photo/wellness-health-lifestyle-workout-graphic-word_53876-13881.jpg" alt="Athlete training" className="relative z-10 w-100 h-[500px] object-cover rounded-3xl border border-white/10 shadow-2xl" />
            </div>
          </div>
        </div>

        {/* Second Block: Left Text, Right Image */}
         <div className="container relative z-10 px-4 pt-32 lg:pt-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold uppercase tracking-wider mb-6 text-primary">
                Precision Engineering
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase mb-6 leading-tight text-white">
                Train With <br />
                <span className="text-white">Purpose</span>
              </h2>
              <p className="text-xl text-gray-400 mb-10 max-w-xl font-body">
                Every movement counts. Our intelligent tracking system ensures you are always optimizing your output, whether lifting heavy or building endurance.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="#calculator" className="text-white font-bold uppercase tracking-wider hover:text-primary transition-colors flex items-center gap-2">
                  Calculate Macros <span className="text-xl">→</span>
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block">
               <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full"></div>
               <img src="https://myindianthings.com/cdn/shop/products/Gym_Yoga_wallpapers-compressed-page-111_3d074a56-8ac7-4b9a-83be-37ba92690c25_800x.jpg?v=1658401685" alt="Gym equipment" className="relative z-10 w-full h-[500px] object-cover rounded-3xl border border-white/10 shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Main App Section (Activities + Dashboard) */}
      <section id="activities" className="py-24 bg-background border-t border-white/5 relative z-10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-white mb-4 uppercase">Track Your <span className="text-gradient">Activities</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Select a workout mode to begin simulating your progress live.</p>
          </div>

          {!activeActivity ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activities.map((act) => (
                <div key={act.id} className="glass-panel p-8 text-center hover-glass group border border-white/5 hover:border-white/20">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${act.color}`}>
                    <act.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{act.name}</h3>
                  <p className="text-gray-400 text-sm mb-8 h-10">{act.desc}</p>
                  <button 
                    onClick={() => handleStartActivity(act.id)}
                    className="w-full py-3 rounded-full font-bold uppercase text-sm border-2 border-slate-700 text-gray-300 group-hover:border-primary group-hover:text-primary transition-colors"
                  >
                    Start Activity
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <Dashboard activeActivity={activeActivity} onReset={() => setActiveActivity(null)} />
          )}
        </div>
      </section>

      {/* Success Stories / Reviews */}
      <ReviewCarousel />

      {/* New Activities Section */}
      <ActivitiesSection />

      {/* Gym Gallery Section */}
      <GymGallery />

      {/* Fitness Calculator Section */}
      <FitnessCalculator />

    </div>
  );
};

export default Home;
