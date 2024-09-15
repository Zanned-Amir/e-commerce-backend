import { Schema, model} from 'mongoose';




const userRefreshTokenSchema = new Schema({
          user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
          },
          refresh_token: {
          type: String,
          required: true,
          },
          device_info: {
                    type: String,
                  },
          ip_address: {
          type: String,
                  },
          expires: {
          type: Date,
          required: true,
          },
          }

,{
          timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
          toJSON: { virtuals: true },
          toObject: { virtuals: true },

});

export default model('UserRefreshToken', userRefreshTokenSchema);



