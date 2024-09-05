import {Provider} from "../models/index";
import BaseRepository from "./base.repository";

class ProviderRepository extends BaseRepository {
    constructor() {
        super(Provider);
    }
}

export default ProviderRepository;