const { createContainer, asValue, asClass, asFunction } = require('awilix');

//config
const config = require('../config');
const app = require('./');

//services
const { HomeService, ProductionService, RatingService, UserService, AuthService } = require('../services/');

//controllers
const { HomeController, UserController, ProductionController, RatingController, AuthController } = require('../controllers');

//routes
const { HomeRoutes, UserRoutes, ProductionRoutes, RatingRoutes, AuthRoutes } = require('../routes/index.routes');
const Routes = require('../routes');

//models 
const { User, Production, Rating } = require('../models');

//repositories
const { UserRepository, ProductionRepository, RatingRepository } = require('../repositories');


const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        HomeService: asClass(HomeService).singleton(),
        UserService: asClass(UserService).singleton(),
        ProductionService: asClass(ProductionService).singleton(),
        RatingService: asClass(RatingService).singleton(),
        AuthService: asClass(AuthService).singleton()
    })
    .register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        ProductionController: asClass(ProductionController.bind(ProductionController)).singleton(),
        RatingController: asClass(RatingController.bind(RatingController)).singleton(),
        AuthController: asClass(AuthController.bind(AuthController)).singleton()
    })
    .register({
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
        ProductionRoutes: asFunction(ProductionRoutes).singleton(),
        RatingRoutes: asFunction(RatingRoutes).singleton(),
        AuthRoutes: asFunction(AuthRoutes).singleton()
    })
    .register({
        User: asValue(User),
        Production: asValue(Production),
        Rating: asValue(Rating),
    })
    .register({
        UserRepository: asClass(UserRepository).singleton(),
        ProductionRepository: asClass(ProductionRepository).singleton(),
        RatingRepository: asClass(RatingRepository).singleton(),
    });

module.exports = container;