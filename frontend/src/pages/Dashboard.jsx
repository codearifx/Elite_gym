import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleMockPayment = async () => {
    setLoading(true);
    try {
      // Intentionally simulating network request for mock payment
      setTimeout(async () => {
         const res = await axios.post('/user/mock-payment', { amount: 49 });
         setUser(res.data.user);
         alert('Mock Payment Successful! Notification Sent.');
         setLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      alert('Payment failed');
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="page-wrapper container section-padding">
      <h2 className="text-neon" style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Member Dashboard</h2>
      
      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        {/* Profile Card */}
        <div className="glass-panel">
          <h3 style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--neon-green)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Profile Details</h3>
          <p className="text-muted" style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Name:</strong> {user.name}</p>
          <p className="text-muted" style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Email:</strong> {user.email}</p>
          <p className="text-muted" style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Status:</strong> {user.isActive ? 'Approved' : 'Pending Approval'}</p>
        </div>

        {/* Membership & Payment Status */}
        <div className="glass-panel" style={{ border: user.paymentStatus !== 'Paid' ? '1px solid #ff3b30' : '1px solid var(--neon-green)' }}>
          <h3 style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--neon-green)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Status Checker</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <p className="text-muted" style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Membership:</strong> {user.membershipStatus}</p>
            <p className="text-muted" style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Payment:</strong> {user.paymentStatus}</p>
          </div>

          {user.paymentStatus !== 'Paid' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div className="alert alert-error" style={{ margin: 0 }}>Membership inactive - Please complete payment</div>
               <button onClick={handleMockPayment} className="btn-neon" style={{ textAlign: 'center' }} disabled={loading}>
                 {loading ? 'Processing...' : 'Pay $49 (Mock)'}
               </button>
            </div>
          ) : (
            <div className="alert alert-success" style={{ margin: 0 }}>Membership Active</div>
          )}
        </div>

        {/* Dashboard Actions */}
        <div className="glass-panel">
          <h3 style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--neon-green)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Quick Actions</h3>
          <button className="btn-neon" style={{ width: '100%', marginBottom: '1rem' }} disabled>Book Trainer (Coming Soon)</button>
          <button className="btn-neon" style={{ width: '100%' }} disabled>Update Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
