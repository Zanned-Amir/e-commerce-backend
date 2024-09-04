import {Review} from '../models/index';
import BaseRepository from './base.repository';

class ReviewRepository extends BaseRepository {
    constructor() {
        super(Review);
    }
}

export default ReviewRepository;