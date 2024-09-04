import {Product} from "../models/index";
import BaseRepository from "./base.repository";

class ProductRepository extends BaseRepository {
    constructor() {
        super(Product);
    }
}

export default ProductRepository;