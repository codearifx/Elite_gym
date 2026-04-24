import React, { useState } from 'react';
import { Calculator, Activity } from 'lucide-react';

const FitnessCalculator = () => {
  const [unit, setUnit] = useState('metric');
  const [formData, setFormData] = useState({
    sex: 'male',
    age: '',
    weight: '',
    height: '',
    goal: 'maintain',
    activityLevel: 'sedentary'
  });
  const [calories, setCalories] = useState(null);

  const calculateCalories = (e) => {
    e.preventDefault();
    if (!formData.age || !formData.weight || !formData.height) return;

    let weightKg = parseFloat(formData.weight);
    let heightCm = parseFloat(formData.height);

    if (unit === 'imperial') {
      weightKg = weightKg * 0.453592; // lbs to kg
      heightCm = heightCm * 2.54; // inches to cm
    }

    // Mifflin-St Jeor Equation
    let bmr;
    if (formData.sex === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(formData.age) + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * parseInt(formData.age) - 161;
    }

    // Activity Multipliers
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    let tdee = bmr * multipliers[formData.activityLevel];

    // Goal Adjustments
    if (formData.goal === 'loss') tdee -= 500;
    if (formData.goal === 'gain') tdee += 500;

    setCalories(Math.round(tdee));
  };

  return (
    <div id="calculator" className="py-24 relative bg-slate-900 border-t border-white/5">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-heading font-bold text-white mb-4 uppercase">Fitness <span className="text-gradient">Calculator</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Calculate your daily calorie requirements to meet your goals.</p>
        </div>

        <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 overflow-hidden relative">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="flex justify-center mb-8">
             <div className="bg-slate-800 p-1 rounded-full flex gap-1 border border-white/10">
               <button 
                onClick={() => setUnit('metric')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${unit === 'metric' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
               >
                 Metric (kg/cm)
               </button>
               <button 
                onClick={() => setUnit('imperial')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${unit === 'imperial' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
               >
                 Imperial (lbs/in)
               </button>
             </div>
          </div>

          <form onSubmit={calculateCalories} className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Sex</label>
                <select 
                  className="input-field"
                  value={formData.sex}
                  onChange={(e) => setFormData({...formData, sex: e.target.value})}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Age (yrs)</label>
                  <input type="number" required className="input-field" placeholder="e.g. 25" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
                  <input type="number" required className="input-field" placeholder={unit === 'metric' ? "e.g. 75" : "e.g. 165"} value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
                <input type="number" required className="input-field" placeholder={unit === 'metric' ? "e.g. 180" : "e.g. 70"} value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Goal</label>
                <select className="input-field" value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})}>
                  <option value="maintain">Maintain Weight</option>
                  <option value="loss">Weight Loss</option>
                  <option value="gain">Weight Gain</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Activity Level</label>
                <select className="input-field" value={formData.activityLevel} onChange={e => setFormData({...formData, activityLevel: e.target.value})}>
                  <option value="sedentary">Sedentary (Little or no exercise)</option>
                  <option value="light">Light (Exercise 1-3 days/week)</option>
                  <option value="moderate">Moderate (Exercise 3-5 days/week)</option>
                  <option value="active">Active (Exercise 6-7 days/week)</option>
                  <option value="very_active">Very Active (Hard exercise/job)</option>
                </select>
              </div>
              
              <button type="submit" className="w-full btn-primary py-4 text-lg mt-4 h-[58px]">
                <Calculator size={20} className="mr-2" /> Calculate Macros
              </button>
            </div>
          </form>

          {calories && (
            <div className="mt-10 p-6 bg-slate-800/80 border border-primary/30 rounded-2xl text-center animate-in fade-in zoom-in duration-500">
              <Activity className="text-secondary mx-auto mb-3" size={32} />
              <p className="text-gray-400 font-bold uppercase tracking-wider mb-2">Your Daily Requirement</p>
              <h3 className="text-6xl font-mono font-black text-white"><span className="text-gradient hover-glass inline-block transition-transform">{calories}</span> <span className="text-2xl text-gray-500 font-body">kcal</span></h3>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FitnessCalculator;
