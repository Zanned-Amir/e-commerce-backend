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
                find(query: any = {}) {
                    return this.model.find(query);  
                }
                async findById(id: string) {
                    return await this.model.findById(id);
                }
                async findOne(conditions: any) {
                    return await this.model.findOne(conditions);
                }
                async update(id: string, data: any , options: any = {}) {
                    return await this.model.findByIdAndUpdate(id, data, { new: true, ...options });
                }
                async delete(id: string) {
                    return await this.model.findByIdAndDelete(id);
                }
                async count() {
                    return await this.model.countDocuments();
                }

                async createWithPopulate(data: any, populateFields: any[]) {
                    const createdDocument = await this.model.create(data);
                    return this.model.findById(createdDocument._id).populate(populateFields);
                }

                async findWithPopulate(query: any = {}, populateFields: any[]) {
                    return this.model.find(query).populate(populateFields);
                }

                async findByIdWithPopulate(id: string, populateFields: any[]) {
                    return await this.model.findById(id).populate(populateFields);
                }

                async updateWithPopulate(id: string, data: any, populateFields: any[], options: any = {}) {
                    return await this.model.findByIdAndUpdate(id, data, { new: true ,...options }).populate(populateFields);
                }



          }
export default BaseRepository;
