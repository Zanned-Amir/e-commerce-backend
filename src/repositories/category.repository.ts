import { Category } from "../models/index";
import BaseRepository from "./base.repository";

class CategoryRepository extends BaseRepository {
    constructor() {
        super(Category);
    }

    async deactivate(id: string) {
          return await Category.findByIdAndUpdate(id, {status: false}, {new: true});
      }

      async activate(id: string) {
          return await Category.findByIdAndUpdate(id, {status: true}, {new: true});
      }

   
      
}

export default CategoryRepository;