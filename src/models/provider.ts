import { Schema, model, Document } from 'mongoose';
import Validator from 'validator'; 

export type provider = Document & {
  name: string;
  type: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  address: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
};

const ProviderSchema = new Schema({

       name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ['company', 'individual'],
          required: true,
        },
        contactInfo: {
          email: {
            type: String,
            validate: {
              validator: Validator.isEmail,
              message: 'Invalid email format',
            },
          },
          phone: {
            type: String,
            required: true,
          },
        },
        address: {
          type: String
        },
        link: {
          type: String,
          validate: {
            validator: Validator.isURL,
            message: 'Invalid URL format',
          },
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      }, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
      });

export default model('Provider', ProviderSchema);