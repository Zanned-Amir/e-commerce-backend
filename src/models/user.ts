import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';
import hash from '../utils/hashing';


export type User = Document & {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  avatar: string;
  role: string;
  status: string;
  phone_number: string;
  address: {
    street: string;
    city: string;
    state: string;
  }[];
  created_at: Date;
  password_changed_at: Date;
};


// Define the schema with types
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email: string) => Validator.isEmail(email),
      message: 'Please provide a valid email',
    },
  },
  password: {
    
    type: String,
    required: true,
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
  phone_number: {
    type: String,
    validate: {
      validator: (phone_number: string) => Validator.isMobilePhone(phone_number),
      message: 'Please provide a valid phone number',
    },
  },
  address: [
   {
    street: {
      type: String,   
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
  }
  ],
 
  password_changed_at:  Date,
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },

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
