const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares');

module.exports = function ({ ProductionController }) {
    const router = Router();
    router.route("/").get(ProductionController.getAll);
    router.route("/random").get(ProductionController.getRandomProduction);
    router.route("/day").get(ProductionController.getProductionOfTheDay);
    router.route("/day/:productionId").put(ProductionController.changeProductionOfTheDay);
    router.route("/").post(AuthMiddleware, ProductionController.create);
    router.route("/:productionId").patch(AuthMiddleware, ProductionController.update);
    router.route("/:productionId").delete(AuthMiddleware, ProductionController.delete);

    return router;
}