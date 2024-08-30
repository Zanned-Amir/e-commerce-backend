import user from '../models/user';


class UserRepository {


    async create(data: any) {
        return await user.create(data);
    }
    async find() {
        return await user.find();
    }
    async findById(id: string) {
        return await user.findById(id);
    }
    async findOne(conditions: any) {
        return await user.findOne(conditions);
    }
    async update(id: string, data: any) {
        return await user.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id: string) {
        return await user.findByIdAndUpdate(id , {status: 'inactive'}, { new: true });
    }

    async count() {
          return await user.countDocuments();
    }

   
}

export default UserRepository;