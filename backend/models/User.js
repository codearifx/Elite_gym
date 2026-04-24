import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: false }, // Requires admin approval
  
  // Membership & Payments
  membershipStatus: { type: String, enum: ['Active', 'Expired', 'None'], default: 'None' },
  paymentStatus: { type: String, enum: ['Paid', 'Not Paid'], default: 'Not Paid' },
  membershipType: { type: String, enum: ['Monthly', 'Yearly', 'None'], default: 'None' },
  membershipStartDate: { type: Date },
  membershipEndDate: { type: Date },
  
  // Basic Information
  sex: { type: String, enum: ['Male', 'Female', 'Other'] },
  age: { type: Number },
  height: { type: Number }, // in cm or inches depending on preference
  weight: { type: Number }, // in kg or lbs
  goals: { type: String },

  // Daily Tasks System
  currentTaskDay: { type: Number, default: 1 }, // Ranges from 1 to 29
  lastTaskCompletionDate: { type: Date }, // To ensure 1 task per day
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
