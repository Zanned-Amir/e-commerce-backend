import User from '../models/user';



class UserRepository {

    async create(data: any) {
        return await User.create(data);
    }
    find() {
        return User.find();  
    }
    async findById(id: string) {
        return await User.findById(id);
    }
    async findOne(conditions: any) {
        return await User.findOne(conditions);
    }
    async update(id: string, data: any) {
        return await User.findByIdAndUpdate(id, data, { new: true });
    }
    async  deactivate(id: string) {
        return await User.findByIdAndUpdate(id , {status: 'inactive'}, { new: true, 
            runValidators: true
        });
    }

    async delete(id: string) {
          return await User.findByIdAndDelete(id);
          }

    async count() {
          return await User.countDocuments();
    }

   
}

export default UserRepository;

