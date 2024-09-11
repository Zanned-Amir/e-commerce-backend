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
      total: number;  // New field to store total for each product
    }
  ];
  total: number;  // Total order price
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
          min: [0.001, 'Price must be greater than 0'],
        },
        discount: {
          type: Number,
          default: 0,
          min: [0, 'Discount must be greater than 0'],
          max: [100, 'Discount must be less than 100'],
        },
        total: {
          type: Number,
          default: 0, 
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: [0.001, 'Total must be greater than 0'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount must be greater than 0'],
      max: [100, 'Discount must be less than 100'],

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

orderSchema.pre('validate', async function (next) {
  try {
    let orderTotal = 0;

    // Loop through each product in the order
    for (let item of this.products) {
      // Fetch the product from the database
      const product = await Product.findById(item.product);
      if (!product) {
        return next(new AppError(`Product with id ${item.product} does not exist`, 404));
      }

      // Get the product discount if it exists
      const productDiscount = product.discount?.value || 0;
      const priceAfterProductDiscount = product.price * (1 - productDiscount / 100);

      // Calculate the total price for this product
      item.price = product.price;
      item.discount = productDiscount;
      item.total = priceAfterProductDiscount * item.quantity;

      // Apply order discount only if the product does not have a discount
      if (productDiscount === 0 && this.discount > 0) {
        item.total = item.total * (1 - this.discount / 100);
      }

      // Add to the overall order total
      orderTotal += item.total;
    }

    // Set the total price for the order
    this.total = orderTotal;

    next();
  } catch (error :any ) {
    next(error);
  }
});

// Middleware to update `updated_at` timestamp on save
orderSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export default model('Order', orderSchema);







