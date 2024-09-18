import { Schema, model} from 'mongoose';

const userInvalidTokenSchema = new Schema({
          user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
          },
          token: {
          type: String,
          required: true,
          },
          expires: {
          type: Date,
          required: true,
          },
},
          {
                    strict: true,
          timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },

          }
);

export default model('UserInvalidToken', userInvalidTokenSchema);