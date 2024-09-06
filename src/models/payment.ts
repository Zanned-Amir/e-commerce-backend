import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';

const paymentSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
    enum: ['credit_card', 'cash'],
    message: 'Payment method must be credit_card or cash',
  },
  amount: {
    type: Number,
    required: true,
    min: [0.001, 'Amount must be greater than 0'],
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
    message: 'Status must be pending, completed or cancelled',
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

export default model('Payment', paymentSchema);