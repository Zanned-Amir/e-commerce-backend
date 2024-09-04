import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';

const inventorySchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
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





export default model('Inventory', inventorySchema);