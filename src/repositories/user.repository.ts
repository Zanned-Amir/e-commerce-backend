import {User} from '../models/index';
import BaseRepository from './base.repository';



class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }
 
    async  deactivate(id: string) {
        return await User.findByIdAndUpdate(id , {status: 'inactive'}, { new: true, 
            runValidators: true
        });
    }

    async  activate(id: string) {
        return await User.findByIdAndUpdate(id , {status: 'active'}, { new: true, 
            runValidators: true
        });
    }


}

export default UserRepository;

