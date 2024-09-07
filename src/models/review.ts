import { Schema, model, Document } from 'mongoose';
import { Product, User } from './index';
import AppError from 'utils/app.error';

export type Review = Document & {
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  review: string;
  rating: number;
  hide: boolean;
  created_at: Date;
  updated_at: Date;
};

const reviewSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  review: {
    type: String,
    required: true,
    minlength: [10, 'Review must be at least 10 characters long'],
    maxlength: [500, 'Review must be at most 500 characters long'],
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'Rating must be greater than 0'],
    max: [5, 'Rating must be less than 6'],
  },
  hide: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.pre('validate', async function (next) {
  const [productExists, userExists] = await Promise.all([
    Product.exists({ _id: this.product }),
    User.exists({ _id: this.user }),
  ]);

  if (!productExists) {
    return next(new AppError('Product does not exist', 404));
  }

  if (!userExists) {
    return next(new AppError('User does not exist', 404));
  }

  next();
});

reviewSchema.pre('save', function (next) {

  this.updated_at = new Date();
  next();
});

export default model('Review', reviewSchema);
