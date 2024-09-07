import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';
import {Category , Provider} from './index';
import AppError from '../utils/app.error';

export type product = Document & {
          name: string;
          description: string;
          price: number;
          vat: number;
          category: string;
          provider: string;
          status: boolean;
          created_at: Date;
          updated_at: Date;
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
                    max: [100, 'Vat must be less than 100']
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
          status: {
                 type: Boolean,
                 default: true
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

productSchema.pre('save', function (next) {
       this.updated_at = new Date();
       next();
       });

export default model('Product', productSchema);

