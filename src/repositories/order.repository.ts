import {Order} from "../models/index";
import BaseRepository from "./base.repository";

class OrderRepository extends BaseRepository {
    constructor() {
        super(Order);
    }
}

export default OrderRepository;