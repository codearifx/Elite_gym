import React, { useState } from 'react';
import { CheckCircle2, Circle, Star, User, ArrowRight } from 'lucide-react';

const initialTasks = [
  { id: 1, text: 'Pushups – 20 reps', completed: false },
  { id: 2, text: 'Squats – 30 reps', completed: false },
  { id: 3, text: 'Running – 10 mins', completed: false },
];

const trainers = [
  { 
    id: 1, 
    name: 'Arnold S.', 
    exp: '12 Years', 
    specialization: 'Muscle Gain', 
    rating: 5, 
    desc: 'Specializes in hypertrophy and heavy lifting mechanics.',
    img: 'https://i.pinimg.com/736x/c2/90/23/c290232f8d163633ccea0eeb80b54fba.jpg'
  },
  { 
    id: 2, 
    name: 'Jillian M.', 
    exp: '4 Years', 
    specialization: 'Fat Loss', 
    rating: 4.5, 
    desc: 'High intensity interval training expert focused on endurance.',
    img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop'
  },
  { 
    id: 3, 
    name: 'Chris H.', 
    exp: '5 Years', 
    specialization: 'Functional Fitness', 
    rating: 4, 
    desc: 'Mobility and bodyweight mastery for complete fitness.',
    img: 'https://img.freepik.com/free-photo/shirtless-young-bodybuilder-doing-exercises-with-dumbells_613910-2371.jpg?semt=ais_hybrid&w=740&q=80'
  }
];

const ActivitiesSection = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };
  
  const isAllCompleted = tasks.every(t => t.completed);

  const handleContinue = () => {
    setSessionCompleted(true);
  };

  return (
    <div className="py-24 relative overflow-hidden bg-background border-t border-white/5">
      <div className="container">
        {/* Daily Tasks Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-heading font-bold text-white mb-4 uppercase">Daily <span className="text-gradient">Tasks</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Complete your daily routine to stay on track.</p>
          </div>
          
          <div className="max-w-2xl mx-auto glass-panel p-8">
            <div className="space-y-4">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${task.completed ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'bg-surface border-white/5 hover:border-white/20'}`}
                >
                  <button className={`${task.completed ? 'text-primary' : 'text-gray-500'}`}>
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <span className={`flex-1 font-bold text-lg ${task.completed ? 'text-white line-through opacity-70' : 'text-gray-200'}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Completion Flow Logic */}
            <div className={`mt-8 transition-all duration-500 overflow-hidden ${isAllCompleted ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                {!sessionCompleted ? (
                   <button onClick={handleContinue} className="w-full btn-primary text-lg py-4 flex items-center justify-center gap-2">
                       Continue Validation <ArrowRight size={20} />
                   </button>
                ) : (
                    <div className="w-full p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-center flex flex-col items-center gap-2 text-green-400 font-bold animate-in zoom-in">
                       <CheckCircle2 size={28} />
                       Session Complete. Data Saved.
                    </div>
                )}
            </div>
          </div>
        </div>

        {/* Gym Trainers Section */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-heading font-bold text-white mb-4 uppercase">Elite <span className="text-gradient">Trainers</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Meet the experts who will guide you to your goals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {trainers.map(trainer => (
              <div key={trainer.id} className="glass-panel hover-glass p-6 group border border-white/5">
                <div className="w-full h-64 rounded-xl overflow-hidden mb-6 relative">
                  <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold text-white">{trainer.rating}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  <User size={20} className="text-primary" /> {trainer.name}
                </h3>
                <div className="flex justify-between text-sm mb-4 border-b border-white/10 pb-4">
                  <span className="text-gray-400">Exp: <span className="text-white font-medium">{trainer.exp}</span></span>
                  <span className="text-primary font-bold">{trainer.specialization}</span>
                </div>
                <p className="text-gray-400 text-sm h-12">{trainer.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ActivitiesSection;
