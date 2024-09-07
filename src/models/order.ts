import { Schema, model, Document } from 'mongoose';
import { Product, User } from './index';
import AppError from '../utils/app.error';

export type Order = Document & {
  user: string;
  address: string;
  products: [
    {
      product: Schema.Types.ObjectId;
      quantity: number;
      price: number;
      discount: number;
    }
  ];
  total: number;
  status: string;
  created_at: Date;
  updated_at: Date;
};

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be greater than 0'],
          max: [100, 'Quantity must be less than 100'],
        },
        price: {
          type: Number,
          required: true,
          min: [0.001, 'Price must be greater than 0'],
        },
        discount: {
          type: Number,
          required: false,
          min: [0, 'Discount must be greater than 0'],
          max: [100, 'Discount must be less than 100'],
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: [0.001, 'Total must be greater than 0'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
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
  }
);

// Middleware to validate if the order contains at least one product
orderSchema.pre('validate', function (next) {
  if (this.products.length === 0) {
    this.invalidate('products', 'Order must contain at least one product');
  }
  next();
});

// Middleware to validate if references (User and Products) exist
orderSchema.pre('validate', async function (next) {
  try {
    // Fetch user and products from the database
    const [userExists, products] = await Promise.all([
      User.exists({ _id: this.user }),
      Product.find({ _id: { $in: this.products.map((item) => item.product) } }),
    ]);

    // Check if user exists
    if (!userExists) {
      return next(new AppError('User does not exist', 404));
    }

    // Identify which products do not exist
    const existingProductIds = new Set(products.map(product => product._id.toString()));
    const missingProductIds = this.products
      .map(product => product.product.toString())
      .filter(id => !existingProductIds.has(id));

    if (missingProductIds.length > 0) {
      return next(new AppError(`The following products do not exist: ${missingProductIds.join(', ')}`, 404));
    }

    next();
  } catch (error : any) {
    next(error);
  }
});

orderSchema.pre('save', function (next) {
          this.updated_at = new Date();
          next();
          });




export default model('Order', orderSchema);
