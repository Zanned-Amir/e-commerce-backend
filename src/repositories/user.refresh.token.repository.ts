import BaseRepository from './base.repository';
import { UserRefreshToken } from '../models/index';

class UserRefreshTokenRepository extends BaseRepository {
    constructor() {
        super(UserRefreshToken);
    }

          async findByToken(refresh_token: string) {
          return await UserRefreshToken.findOne({ refresh_token });
          }

          async deleteByUserIdAndToken(user: string, refresh_token: string) {
            return await UserRefreshToken.findOneAndDelete({ user, refresh_token });
            }

            async deleteByToken(refresh_token: string) {
                return await UserRefreshToken.findOneAndDelete({ refresh_token });
                }

         


}

export default UserRefreshTokenRepository;