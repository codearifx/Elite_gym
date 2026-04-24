import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completingTask, setCompletingTask] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/tasks', { headers: { Authorization: `Bearer ${token}` } });
        setTaskData(res.data);
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (user && user.paymentStatus === 'Paid') {
       fetchTasks();
    } else {
       setLoading(false);
    }
  }, [user]);

  const handleMarkComplete = async () => {
    setCompletingTask(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/tasks/complete', {}, { headers: { Authorization: `Bearer ${token}` } });
      
      // Update local state
      setTaskData({
        ...taskData,
        currentDay: res.data.nextDay,
        isExpired: res.data.isExpired,
        lastCompletionDate: new Date().toISOString()
      });
    } catch (err) {
      alert("Failed to mark task as complete. Maybe you already completed one today?");
    } finally {
      setCompletingTask(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background relative px-4">
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-surface to-background pointer-events-none z-0"></div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl font-heading text-white uppercase italic mb-8">
          Welcome back, <span className="text-neon">{user.name}</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Details Column (1/3 width) */}
          <div className="space-y-8">
            <div className="bg-surface/80 backdrop-blur border border-white/10 p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-heading text-white uppercase border-b border-neon/30 pb-3 mb-4">Profile Details</h3>
              <div className="space-y-3 font-mono text-sm text-gray-400">
                <p><strong className="text-white">Email:</strong> {user.email}</p>
                <p><strong className="text-white">Account:</strong> {user.isActive ? 'Approved' : 'Pending'}</p>
              </div>
            </div>

            <div className={`bg-surface/80 backdrop-blur border p-6 rounded-2xl shadow-xl ${user.paymentStatus === 'Paid' ? 'border-neon/50 shadow-[0_0_15px_rgba(57,255,20,0.1)]' : 'border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.1)]'}`}>
              <h3 className="text-xl font-heading text-white uppercase border-b border-white/10 pb-3 mb-4">Membership Status</h3>
              <div className="space-y-3 font-mono text-sm">
                <p className="text-gray-400"><strong className="text-white">Plan:</strong> {user.membershipType || 'None'}</p>
                <p className="text-gray-400">
                  <strong className="text-white">Status:</strong> 
                  <span className={user.paymentStatus === 'Paid' ? 'text-neon ml-2' : 'text-red-500 ml-2'}>
                    {user.paymentStatus}
                  </span>
                </p>
              </div>
              
              {user.paymentStatus !== 'Paid' && (
                <div className="mt-6">
                  <div className="bg-red-500/10 text-red-500 border border-red-500 p-3 rounded-lg mb-4 text-sm text-center">
                    Membership inactive or expired.
                  </div>
                  <Link to="/membership-form" className="block text-center w-full py-3 bg-neon text-background uppercase font-bold rounded-full hover:bg-white transition-all shadow-[0_0_10px_rgba(57,255,20,0.3)]">
                    Renew / Upgrade
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Daily Task System Column (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="bg-surface/80 backdrop-blur border border-white/10 p-8 rounded-2xl shadow-xl h-full flex flex-col">
              <h3 className="text-2xl font-heading text-neon uppercase border-b border-white/10 pb-4 mb-6 flex items-center justify-between">
                <span>Daily Mission</span>
                {taskData && !taskData.isExpired && (
                  <span className="text-sm font-mono text-gray-400 bg-background px-3 py-1 rounded-full border border-white/5">
                    Day {taskData.currentDay} of 29
                  </span>
                )}
              </h3>

              {loading ? (
                 <div className="flex-1 flex items-center justify-center text-gray-400">Loading mission data...</div>
              ) : user.paymentStatus !== 'Paid' ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-xl bg-background/50">
                    <p className="text-gray-400 mb-4">Only elite members have access to the 29-Day Transformation Tasks.</p>
                 </div>
              ) : taskData && taskData.isExpired ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-red-500/30 rounded-xl bg-red-500/5">
                    <h4 className="text-2xl font-heading text-red-500 uppercase mb-2">Cycle Complete!</h4>
                    <p className="text-gray-300 mb-6">You've completed the 29 days, or your cycle demands renewal to continue processing tasks.</p>
                    <Link to="/membership-form" className="px-8 py-3 bg-red-500 text-white font-bold uppercase rounded-full hover:bg-red-600 transition-all">
                       Renew Membership
                    </Link>
                 </div>
              ) : taskData ? (
                 <div className="flex-1 flex flex-col">
                    {/* Mission Details */}
                    <div className="bg-background/80 border border-white/10 rounded-xl p-6 mb-8 text-center flex-1 flex flex-col justify-center relative overflow-hidden group">
                       <p className="text-gray-400 text-sm font-mono uppercase tracking-widest mb-4">Today's Workout Task</p>
                       <h4 className="text-3xl md:text-4xl font-heading text-white uppercase shadow-black drop-shadow-md">
                         {taskData.task}
                       </h4>
                    </div>

                    {/* Checkbox and Action */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-6">
                       <div className="text-sm">
                         <p className="text-gray-300 font-mono">
                           <span className="text-neon font-bold text-lg">{30 - taskData.currentDay}</span> days left to complete the tasks.
                         </p>
                       </div>
                       <button 
                         onClick={handleMarkComplete}
                         disabled={completingTask}
                         className="flex items-center gap-3 px-8 py-4 bg-neon/10 border-2 border-neon text-neon hover:bg-neon hover:text-background font-black uppercase tracking-widest rounded-full transition-all disabled:opacity-50"
                       >
                         {completingTask ? 'Processing...' : 'Mark as Completed'}
                       </button>
                    </div>

                    {/* Progress Tracker */}
                    <div className="mt-8">
                       <div className="flex justify-between text-xs text-gray-500 font-mono mb-2 uppercase">
                         <span>Progress</span>
                         <span>{Math.round((taskData.currentDay - 1) / 29 * 100)}%</span>
                       </div>
                       <div className="w-full bg-background rounded-full h-3 border border-white/5 overflow-hidden">
                          <div 
                            className="bg-neon h-full transition-all duration-1000 shadow-[0_0_10px_rgba(57,255,20,0.8)]" 
                            style={{ width: `${((taskData.currentDay - 1) / 29) * 100}%` }}
                          ></div>
                       </div>
                    </div>
                 </div>
              ) : (
                 <div className="flex-1 flex items-center justify-center text-gray-400">Task data unavailable.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
