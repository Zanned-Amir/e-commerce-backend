import BaseRepository from './base.repository';
import {  UserInvalidToken } from '../models/index';

class UserInvalidTokenRepository extends BaseRepository {
    constructor() {
        super(UserInvalidToken);
    }

}

export default UserInvalidTokenRepository;