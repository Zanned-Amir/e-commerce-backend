import {Inventory} from "../models/index";
import BaseRepository from "./base.repository";

class InventoryRepository extends BaseRepository {
    constructor() {
        super(Inventory);
    }
}

export default InventoryRepository;