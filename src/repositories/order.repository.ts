import {Order} from "../models/index";
import BaseRepository from "./base.repository";

class OrderRepository extends BaseRepository {
    constructor() {
        super(Order);
    }

    async updateStatus(id: string, status: string) {
        return await Order.findByIdAndUpdate(id, {status}, {new: true});
    }
}

export default OrderRepository;