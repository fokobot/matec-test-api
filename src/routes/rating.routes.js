const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares');

module.exports = function({ RatingController }) {
    const router = Router();
    router.route("/:userId").get(AuthMiddleware, RatingController.getUserRatings);
    router.route("/production/:productionId").get(AuthMiddleware, RatingController.getProductionRatings);
    router.route("/").post(AuthMiddleware, RatingController.create);
    router.route("/:ratingId").patch(AuthMiddleware, RatingController.update);
    router.route("/:ratingId").delete(AuthMiddleware, RatingController.delete);

    return router;
}