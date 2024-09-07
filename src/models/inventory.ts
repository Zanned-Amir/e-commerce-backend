import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';

import { Product } from './index';
import AppError from '../utils/app.error';


export type inventory = Document & {
  product: Schema.Types.ObjectId;
  label: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
};

const inventorySchema = new Schema({
  // ref is used to reference the product model
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  label: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity must be greater than 0'],
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



inventorySchema.pre('save', function (next) {
   
  const existProduct = Product.exists({ _id: this.product });
  if (!existProduct) {
    return next(new AppError('Product does not exist', 404));
  }

  next();
});




export default model('Inventory', inventorySchema);