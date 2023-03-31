const BaseService = require("./base.service");
let _ratingRepository = null;

class RatingService extends BaseService {
    constructor({ RatingRepository }) {
        super(RatingRepository);
        _ratingRepository = RatingRepository;
    }

    async getProductionRatings(productionId) {
        return await _ratingRepository.getProductionRatings(productionId);
    }

    async getUserRatings(userId) {
        return await _ratingRepository.getUserRatings(userId);
    }
}

module.exports = RatingService;