import {Product} from "../models/index";
import BaseRepository from "./base.repository";

class ProductRepository extends BaseRepository {
    constructor() {
        super(Product);
    }

    async deactivate(id: string) {
        return await Product.findByIdAndUpdate(id, {status: false}, {new: true});
    }

    async activate(id: string) {
        return await Product.findByIdAndUpdate(id, {status: true}, {new: true});
    }
}

export default ProductRepository;