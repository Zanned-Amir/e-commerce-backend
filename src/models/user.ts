import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';
import hash from '../utils/hashing';

// Define an interface for your schema to use with TypeScript


// Define the schema with types
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
    validate: {
      validator: (email: string) => Validator.isEmail(email),
      message: 'Please provide a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
    validate: {
      validator: (password: string) => Validator.isStrongPassword(password),
      message: 'Please provide a strong password',
    },
  },
  password_confirm: {
    type: String,
    required: true,
    validate: {
      validator: function (this: any, el: string): boolean {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  avatar: {
    type: String,
    default: 'default.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  password_changed_at: Date,
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Middleware for hashing password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hash.hashPassword(this.password);
  this.password_confirm = undefined as  any;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.password_changed_at  = new Date(Date.now() - 1000);
  next();
});

// Export the model
export default model('User', userSchema);
