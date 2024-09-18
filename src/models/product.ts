import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';
import {Category , Provider} from './index';
import AppError from '../utils/app.error';

// src/models/product.ts
export type Product = Document & {
  name: string;
  description: string;
  price: number;
  vat: number;
  category: Schema.Types.ObjectId;
  provider: Schema.Types.ObjectId;
  images: string[];
  status: boolean;
  created_at: Date;
  updated_at: Date;
  discount?: {
    value: number;
    start_date?: Date;
    end_date?: Date;
  };
};

const  productSchema = new Schema({
          name:{
                    type:String,
                    required: [true, 'Name is required'],
          }
          ,
          description:{
                    type:String,
                    required: [true, 'Description is required'],
          },
          price: {
                    type: Number,
                    required: true,
                    min: [0.001, 'Price must be greater than 0']
          }, 
          vat: {
                    type: Number,
                    required: true,
                    min: [0, 'Vat must be greater than 0'],
                    max: [100, 'Vat must be less than 100'],
                    default: 0,
          },
          //ref is used to reference the category model
          category: {
                    type: Schema.Types.ObjectId,
                    ref: 'Category',
                    required: true,
              
          },
          // ref is used to reference the provider model
          provider: {
                    type: Schema.Types.ObjectId,
                    ref: 'Provider',
                    required: true,
                  
          },

          images: [
                    {
                              type: String,
                              required: [true, 'Image is required'],
                    },
          ],
          status: {
                 type: Boolean,
                 default: true
          },
        
          discount:{
            value: {
                      type: Number,
                      required: false,
                      min: [0, 'Discount must be greater than 0'],
                      max: [100, 'Discount must be less than 100'],
                      default: 0,
            },
            start_date: {
                      type: Date,
                      required: false,
            },
            end_date: {
                      type: Date,
                      required: false,
            }
          }
          },
          {         
            strict: true,
                    toJSON: { virtuals: true },
                    toObject: { virtuals: true },
                    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
          }
);


productSchema.pre('validate', async function (next) {
   
       // Perform bulk lookups to check existence of category and provider
       const [categoryExists, providerExists] = await Promise.all([
         Category.exists({ _id: this.category }),
         Provider.exists({ _id: this.provider }),
       ]);
     
       if (!categoryExists) {
         return next(new AppError('Category does not exist', 404));
       }
     
       if (!providerExists) {
         return next(new AppError('Provider does not exist', 404));
       }

     
       next();
     });



export default model('Product', productSchema);

