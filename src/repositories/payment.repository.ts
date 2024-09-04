import {Payment} from "../models/index";
import BaseRepository from "./base.repository";

class PaymentRepository extends BaseRepository {
    constructor() {
        super(Payment);
    }
}

export default PaymentRepository;