import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/admin/users');
      setUsers(res.data.users);
    } catch (err) {
      console.error(err);
    }
  };

  const markApproved = async (id) => {
    try {
      await axios.put(`/admin/user/${id}/approve`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const markPaid = async (id) => {
     try {
       await axios.put(`/admin/user/${id}/payment`);
       fetchUsers();
     } catch (err) {
       console.error(err);
     }
  };

  return (
    <div className="page-wrapper container section-padding">
      <h2 className="text-neon" style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Command Center (Admin)</h2>
      
      <div className="glass-panel">
        <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Manage Members</h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--neon-green)' }}>
                <th style={{ padding: '1rem' }}>Name</th>
                <th style={{ padding: '1rem' }}>Email</th>
                <th style={{ padding: '1rem' }}>Approval</th>
                <th style={{ padding: '1rem' }}>Payment</th>
                <th style={{ padding: '1rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }}>{u.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{u.email}</td>
                  <td style={{ padding: '1rem' }}>
                     <span style={{ color: u.isActive ? 'var(--neon-green)' : '#ff9900' }}>{u.isActive ? 'Approved' : 'Pending'}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                     <span style={{ color: u.paymentStatus === 'Paid' ? 'var(--neon-green)' : '#ff3b30' }}>{u.paymentStatus}</span>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                    {!u.isActive && <button onClick={() => markApproved(u._id)} style={{ padding: '0.3rem 0.6rem', background: 'var(--neon-green)', border: 'none', color: '#000', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Approve</button>}
                    {u.paymentStatus !== 'Paid' && <button onClick={() => markPaid(u._id)} style={{ padding: '0.3rem 0.6rem', background: 'transparent', border: '1px solid var(--neon-green)', color: 'var(--neon-green)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Mark Paid</button>}
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan="5" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No users found (Waiting for API connection)</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
