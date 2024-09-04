import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';

const  productSchema = new Schema({
          name:{
                    type:String,
                    required:true
          }
          ,
          description:{
                    type:String,
                    required:true
          },
          price: {
                    type: Number,
                    required: true,
                    min: [0.001, 'Price must be greater than 0'],
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

export default model('Product', productSchema);

