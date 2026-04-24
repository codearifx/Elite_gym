import User from '../models/User.js';

const hardcodedTasks = [
  "Day 1 – Cardio (20 minutes)",
  "Day 2 – Pushups (3 sets)",
  "Day 3 – Core workout",
  "Day 4 – Yoga & Stretching",
  "Day 5 – Full Body HIIT",
  "Day 6 – Leg Press & Squats",
  "Day 7 – Active Recovery (Light Walking)",
  "Day 8 – Back & Biceps",
  "Day 9 – Chest & Triceps",
  "Day 10 – Mobility Routine",
  "Day 11 – Deadlifts & Hamstrings",
  "Day 12 – Cardio (30 minutes)",
  "Day 13 – Pushups & Pullups",
  "Day 14 – Rest Day",
  "Day 15 – Advanced Core workout",
  "Day 16 – Yoga & Flexibility",
  "Day 17 – Powerlifting basics",
  "Day 18 – Shoulders & Arms",
  "Day 19 – Kettlebell workout",
  "Day 20 – Jump rope (15 mins)",
  "Day 21 – Active Recovery (Stretching)",
  "Day 22 – Full Body Circuit",
  "Day 23 – Sprints (Interval Training)",
  "Day 24 – Heavy Squats day",
  "Day 25 – Calisthenics",
  "Day 26 – Swimming or Rowing",
  "Day 27 – Bench press max",
  "Day 28 – Yoga & Meditation",
  "Day 29 – Final Full Body Test"
];

export const getDailyTasks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).json({ message: 'User not found' });
    
    if (user.paymentStatus !== 'Paid') {
      return res.status(403).json({ message: 'Please purchase a membership to access daily tasks.' });
    }

    const currentTaskDay = user.currentTaskDay || 1;
    
    res.json({
      currentDay: currentTaskDay,
      task: currentTaskDay <= 29 ? hardcodedTasks[currentTaskDay - 1] : "All 29 tasks completed! Please renew membership.",
      isExpired: currentTaskDay > 29,
      lastCompletionDate: user.lastTaskCompletionDate
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markTaskComplete = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(404).json({ message: 'User not found' });
    
    if (user.paymentStatus !== 'Paid') {
      return res.status(403).json({ message: 'Membership required' });
    }
    
    if (user.currentTaskDay > 29) {
      return res.status(400).json({ message: 'Task limit reached. Please renew membership to start a new cycle.' });
    }

    // Mark today's task as complete and increment day
    user.lastTaskCompletionDate = new Date();
    user.currentTaskDay += 1;
    
    if (user.currentTaskDay > 29) {
        user.paymentStatus = 'Not Paid'; // Prompt for renewal
    }

    await user.save();
    
    res.json({
      message: 'Task completed successfully',
      nextDay: user.currentTaskDay,
      isExpired: user.currentTaskDay > 29
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
