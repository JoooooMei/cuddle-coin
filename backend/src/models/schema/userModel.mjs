import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Email address is not valid'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false,
  },
  role: {
    type: [String],
    enum: ['user', 'admin', 'miner'],
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.checkPassword = async function (
  passwordToCheck,
  userPassword
) {
  return await bcrypt.compare(passwordToCheck, userPassword);
};

export default mongoose.model('User', userSchema);
