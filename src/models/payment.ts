import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';
import { Order } from './index';
import AppError from '../utils/app.error';

export type payment = Document & {
  order_id: Schema.Types.ObjectId;
  payment_method: string;
  amount: number;
  status: string;
  created_at: Date;
  updated_at: Date;
};

const paymentSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true ,
  },
  payment_method: {
    type: String,
    required:  true,
    enum: ['credit_card', 'cash'],
    message: 'Payment method must be credit_card or cash',
  },
  amount: {
    type: Number,
    required:  true,
    min: [0.001, 'Amount must be greater than 0'],
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending',
    message: 'Status must be pending, completed or cancelled',
  },

},
  {
    strict: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

paymentSchema.pre('validate', async function (next) {
  const order = await Order.exists({ _id: this.order });
  if (!order) {
    return next(new AppError('Order does not exist', 404));
  }
  next();
});



export default model('Payment', paymentSchema);