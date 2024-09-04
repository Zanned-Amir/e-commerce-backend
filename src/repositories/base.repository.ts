// base-repository.ts
import { Document } from 'mongoose';



abstract class BaseRepository {

          protected model: any;

          constructor(model: any) {
                    this.model = model;
          }

          async create(data: any) {
                    return await this.model.create(data);
                }
                find() {
                    return this.model.find();  
                }
                async findById(id: string) {
                    return await this.model.findById(id);
                }
                async findOne(conditions: any) {
                    return await this.model.findOne(conditions);
                }
                async update(id: string, data: any) {
                    return await this.model.findByIdAndUpdate(id, data, { new: true });
                }
                async delete(id: string) {
                    return await this.model.findByIdAndDelete(id);
                }
                async count() {
                    return await this.model.countDocuments();
                }
          }
export default BaseRepository;
