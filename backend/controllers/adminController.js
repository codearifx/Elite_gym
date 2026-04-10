import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user) {
      user.isActive = true;
      user.membershipStatus = 'Active'; // Default assign
      await user.save();
      res.json({ message: 'User approved' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markPaymentPaid = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if(user) {
      user.paymentStatus = 'Paid';
      await user.save();
      res.json({ message: 'Payment status updated to Paid' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
