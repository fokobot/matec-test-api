const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');
const { NotFoundMiddleware, ErrorMiddleware } = require('../middlewares');
const swaggerIU = require('swagger-ui-express');
const { SWAGGER_PATH } = require('../config');
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function({ HomeRoutes, UserRoutes, ProductionRoutes, RatingRoutes, AuthRoutes }) {
    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes.use(express.urlencoded({ extended: true })).use(express.json()).use(cors()).use(helmet()).use(compression());
    apiRoutes.use('/home', HomeRoutes);
    apiRoutes.use('/user', UserRoutes);
    apiRoutes.use('/production', ProductionRoutes);
    apiRoutes.use('/rating', RatingRoutes);
    apiRoutes.use('/auth', AuthRoutes);

    router.use('/v1/api', apiRoutes);
    router.use("/api-docs", swaggerIU.serve, swaggerIU.setup(swaggerDocument));

    router.use(NotFoundMiddleware);
    router.use(ErrorMiddleware);

    return router;
}