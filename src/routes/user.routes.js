const { Router } = require('express');
const { AuthMiddleware } = require('../middlewares');

module.exports = function({ UserController }) {
    const router = Router();
    router.route("/").get(AuthMiddleware, UserController.getAll);
    router.route("/:userId").get(AuthMiddleware, UserController.get);
    router.route("/:userId").patch(AuthMiddleware, UserController.update);
    router.route("/:userId").delete(AuthMiddleware, UserController.delete);
    return router;
}