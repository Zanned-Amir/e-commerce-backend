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

export default model('Category', CategorySchema);