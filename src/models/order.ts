import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';


const orderSchema = new Schema({
          // ref is used to reference the user model
          user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
          },
          address: 
          {
                    type: String,
                    required: true,
          },
          // ref is used to reference the product model
          
          products: [
                    {
                              product_id: {
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
                                    
                              }
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
          }
},
          {
                    toJSON: { virtuals: true },
                    toObject: { virtuals: true },
          }
)



export default model('Order', orderSchema);
