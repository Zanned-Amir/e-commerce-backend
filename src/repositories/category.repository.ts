import { category } from "models";
import BaseRepository from "./base.repository";

class CategoryRepository extends BaseRepository {
    constructor() {
        super(category);
    }
}

export default CategoryRepository;