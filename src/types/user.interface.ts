
import { Document } from 'mongoose';

export default interface IUser extends Document {
          username: string;
          email: string;
          password: string;
          password_confirm?: string;
          avatar: string;
          role: 'user' | 'admin';
          status: 'active' | 'inactive' | 'banned';
          created_at: Date;
          password_changed_at?: Date;
        }

