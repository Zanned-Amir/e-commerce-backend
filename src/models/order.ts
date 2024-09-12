import { Schema, model, Document } from 'mongoose';
import { Product, Inventory } from './index';
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

const MAX_RETRIES = 5;

orderSchema.pre('validate', async function (next) {
  try {
    let orderTotal = 0;

    
    for (let item of this.products) {

      let retries = 0;
      let success = false;
     
      const product = await Product.findById(item.product);
      if (!product) {
        return next(new AppError(`Product with id ${item.product} does not exist`, 404));
      }

      while (!success && retries < MAX_RETRIES) {
        // Fetch the inventory record and apply concurrency check
        const inventory = await Inventory.findOne({ product: item.product }).select('quantity').exec();

        if (!inventory) {
          return next(new AppError(`Inventory for product ${item.product} not found`, 404));
        }

        // Check if enough stock is available
        if (inventory.quantity < item.quantity) {
          return next(new AppError(`Not enough stock for product ${item.product}`, 400));
        }

        // Adjust inventory quantity
        inventory.quantity -= item.quantity;

        // Ensure we only throw an error if inventory hits 0 or less
        if (inventory.quantity < 0) {
          return next(new AppError(`Product ${item.product} is out of stock`, 400));
        }

        try {
          // Try to save the inventory, which will trigger version conflict handling
          await inventory.save();
          success = true; // Success if no conflict
        } catch (err: any) {
          // Check for version conflict
          if (err.name === 'VersionError') {
            retries += 1; // Retry if version conflict
          } else {
            return next(err); // Throw other errors
          }
        }
      }

      if (!success) {
        return next(new AppError(`Failed to reserve stock for product ${item.product} after multiple attempts`, 500));
      }


      
      const productDiscount = product.discount?.value || 0;
      const priceAfterProductDiscount = product.price * (1 - productDiscount / 100);

      item.price = product.price;
      item.discount = productDiscount;
      item.total = priceAfterProductDiscount * item.quantity;

      
      if (productDiscount === 0 && this.discount > 0) {
        item.total = item.total * (1 - this.discount / 100);
      }

 
      orderTotal += item.total;
    }

   
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







