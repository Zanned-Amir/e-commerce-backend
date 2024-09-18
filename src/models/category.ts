import { Schema, model, Document } from 'mongoose';
import Validator from 'validator';

export type category = Document & {
          name: string;
          description: string;
          status: boolean;
          created_at: Date;
          updated_at: Date;
};


const CategorySchema = new Schema({
          name: {
          type: String,
          unique : true,
          required:   true,        
          },
          description: {
          type: String,
          },
          status: {
          type: Boolean,
          default: true,
          },
     
          },
          {
                    strict: true,
          toJSON: { virtuals: true },
          toObject: { virtuals: true },
          timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
          }
          );

export default model('Category', CategorySchema);