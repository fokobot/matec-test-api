const BaseRepository = require("./base.repository");
let _rating = null;
class RatingRepository extends BaseRepository {

    constructor({ Rating }) {
        super(Rating);
        _rating = Rating;
    }

    async getProductionRatings(productionId) {
        return await _rating.find({ production: productionId });
    }

    async getUserRatings(userId) {
        return await _rating.find({ user: userId });
    }

}

module.exports = RatingRepository;