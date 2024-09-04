import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';


const  reviewSchema = new Schema({
          product_id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
          },
          user_id: {
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

reviewSchema.index({ product_id: 1, user_id: 1 }, { unique: true });

export default  model('Review', reviewSchema);