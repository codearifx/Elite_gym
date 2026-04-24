import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [planType, setPlanType] = useState('Monthly');
  const [paymentMethod, setPaymentMethod] = useState('GPay');
  const [loading, setLoading] = useState(false);
  
  const [successData, setSuccessData] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/user/mock-payment', 
        { planType, method: paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const { orderId, amount } = response.data;
      
      const details = {
        userId: user?._id || 'GUEST',
        dateTime: new Date().toLocaleString(),
        paymentAmount: amount,
        orderId: orderId,
        planType
      };
      
      setSuccessData(details);
      
      // Redirect to Elite Squad or Dashboard after showing popup
      setTimeout(() => {
        navigate('/elite-squad');
      }, 5000);

    } catch (error) {
      console.error(error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background relative px-4 flex items-center justify-center">
      {/* Success Popup */}
      {successData && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-neon/50 rounded-2xl p-8 max-w-md w-full shadow-[0_0_40px_rgba(57,255,20,0.3)] animate-pulse shadow-neon transition-all">
            <h2 className="text-3xl font-heading text-neon text-center uppercase mb-6 drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]">Payment Successful!</h2>
            
            <div className="space-y-4 font-mono text-sm text-gray-300 bg-background/50 p-4 rounded-lg border border-white/5">
               <div className="flex justify-between border-b border-white/10 pb-2">
                 <span className="text-gray-500">User ID</span>
                 <span className="truncate ml-4">{successData.userId}</span>
               </div>
               <div className="flex justify-between border-b border-white/10 pb-2">
                 <span className="text-gray-500">Date & Time</span>
                 <span>{successData.dateTime}</span>
               </div>
               <div className="flex justify-between border-b border-white/10 pb-2">
                 <span className="text-gray-500">Order ID</span>
                 <span className="text-neon">{successData.orderId}</span>
               </div>
               <div className="flex justify-between pb-2">
                 <span className="text-gray-500">Amount</span>
                 <span className="text-xl font-bold text-white">₹{successData.paymentAmount}</span>
               </div>
            </div>
            
            <p className="text-center text-neon/70 mt-6 text-sm">Redirecting to Elite Squad...</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-lg bg-surface/80 backdrop-blur border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative">
        <h1 className="text-3xl font-heading text-white uppercase mb-8 text-center border-b border-white/10 pb-6">Secure Checkout</h1>
        
        {/* Plan Selection */}
        <div className="mb-8">
          <h3 className="text-gray-400 font-mono text-sm uppercase tracking-wider mb-4">Choose Plan</h3>
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => setPlanType('Monthly')}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center ${planType === 'Monthly' ? 'border-neon bg-neon/10 shadow-[0_0_15px_rgba(57,255,20,0.2)]' : 'border-white/10 bg-black/40 hover:border-white/30'}`}
            >
              <div className="font-heading uppercase text-xl text-white">Monthly <br/>(3 Months)</div>
              <div className="text-neon font-bold mt-2">₹999</div>
            </div>
            <div 
              onClick={() => setPlanType('Yearly')}
              className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center ${planType === 'Yearly' ? 'border-neon bg-neon/10 shadow-[0_0_15px_rgba(57,255,20,0.2)]' : 'border-white/10 bg-black/40 hover:border-white/30'}`}
            >
              <div className="font-heading uppercase text-xl text-white">Yearly Access</div>
              <div className="text-neon font-bold mt-2">₹3599</div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <h3 className="text-gray-400 font-mono text-sm uppercase tracking-wider mb-4">Payment Method</h3>
          <div className="space-y-3">
            {['GPay', 'PhonePe', 'Debit Card'].map(method => (
              <label key={method} className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === method ? 'border-neon bg-neon/5' : 'border-white/10 bg-black/40'}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value={method} 
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-4 accent-neon"
                />
                <span className="text-white font-medium">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Total & Pay Button */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex justify-between items-end mb-6">
             <span className="text-gray-400">Total Billed Today</span>
             <span className="text-4xl font-heading font-black text-white">₹{planType === 'Monthly' ? '999' : '3599'}</span>
          </div>
          <button 
            onClick={handlePayment} 
            disabled={loading}
            className="w-full py-4 bg-neon text-background uppercase font-black hover:bg-white transition-all rounded-full drop-shadow-[0_0_15px_rgba(57,255,20,0.3)] disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Complete Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
