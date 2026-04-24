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

export const updateBasicInfo = async (req, res) => {
  try {
    const { sex, age, height, weight, goals } = req.body;
    const user = await User.findById(req.user._id);
    if(user) {
      user.sex = sex || user.sex;
      user.age = age || user.age;
      user.height = height || user.height;
      user.weight = weight || user.weight;
      user.goals = goals || user.goals;
      const updatedUser = await user.save();
      const { password, ...userWithoutPassword } = updatedUser._doc;
      res.json({ message: 'Profile updated', user: userWithoutPassword });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const processMockPayment = async (req, res) => {
  try {
    const { planType, method } = req.body; // e.g., Monthly / Yearly
    const user = await User.findById(req.user._id);
    if(user) {
      user.paymentStatus = 'Paid';
      user.membershipStatus = 'Active';
      user.membershipType = planType || 'Monthly';
      user.membershipStartDate = new Date();
      
      let endDate = new Date();
      if(user.membershipType === 'Yearly') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else {
        endDate.setMonth(endDate.getMonth() + 3); // 3 months plan as per user request in Plan 1
      }
      user.membershipEndDate = endDate;
      
      const updatedUser = await user.save();
      const { password, ...userWithoutPassword } = updatedUser._doc;
      
      res.json({ 
        message: 'Payment successful', 
        user: userWithoutPassword,
        orderId: `ORDER_${Math.floor(Math.random() * 1000000)}`,
        amount: planType === 'Yearly' ? 3599 : 999,
        paymentMethod: method || 'Debit Card'
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEliteSquad = async (req, res) => {
  try {
    const eliteUsers = await User.find({ paymentStatus: 'Paid' }).select('name _id createdAt membershipType');
    res.json(eliteUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
