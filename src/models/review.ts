import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';


const  reviewSchema = new Schema({
          // ref is used to reference the product model
          product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
          },
          // ref is used to reference the user model
          user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
          },
          review: {
                    type: String,
                    required: true,
          },
          rating: {
                    type: Number,
                    required: true,
                    min: [1, 'Rating must be greater than 0'],
                    max: [5, 'Rating must be less than 6'],
          },
          created_at: {
                    type: Date,
                    default: Date.now,
          },
          updated_at: {
                    type: Date,
                    default: Date.now,
          }
},
          {
                    toJSON: { virtuals: true },
                    toObject: { virtuals: true },
          }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

export default  model('Review', reviewSchema);