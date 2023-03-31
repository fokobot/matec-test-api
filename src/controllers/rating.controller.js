let _ratingService = null;
let _productionService = null;

class RatingController {

    constructor({ RatingService, ProductionService }) {
        _ratingService = RatingService;
        _productionService = ProductionService;
    }

    async getUserRatings(req, res) {
        const { userId } = req.params;
        const user = await _ratingService.getUserRatings(userId);
        return res.send(user);
    }

    async create(req, res) {
        const { body } = req;
        const createdRating = await _ratingService.create(body);
        await _productionService.updateProductionData(createdRating.production._id);
        return res.status(201).send(createdRating);
    }

    async update(req, res) {
        const { body } = req;
        const { ratingId } = req.params;
        const updateRating = await _ratingService.update(ratingId, body);
        await _productionService.updateProductionData(updateRating.production._id);
        return res.send(updateRating);
    }

    async delete(req, res) {
        const { ratingId } = req.params;
        const ratingUser = await _ratingService.delete(ratingId);
        return res.send(ratingUser);
    }

    async getProductionRatings(req, res) {
        const { productionId } = req.params;
        const productionRatings = await _productionService.getProductionRatings(productionId);
        return res.send(productionRatings);
    }

}

module.exports = RatingController;