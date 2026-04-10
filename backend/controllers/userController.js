import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if(user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const processMockPayment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if(user) {
      user.paymentStatus = 'Paid';
      user.membershipStatus = 'Active';
      const updatedUser = await user.save();
      
      const { password, ...userWithoutPassword } = updatedUser._doc;
      
      res.json({ message: 'Payment successful', user: userWithoutPassword });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
