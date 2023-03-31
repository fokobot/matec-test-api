const BaseService = require("./base.service");
let _productionRepository = null;

class ProductionService extends BaseService {
    constructor({ ProductionRepository }) {
        super(ProductionRepository);
        _productionRepository = ProductionRepository;
    }

    async getRandomProduction() {
        return await _productionRepository.getRandomProduction();
    }

    async getProductionOfTheDay() {
        return await _productionRepository.getProductionOfTheDay();
    }

    async changeProductionOfTheDay(productionId) {
        return await _productionRepository.changeProductionOfTheDay(productionId);
    }

    async updateProductionData(productionId) {
        return await _productionRepository.updateProductionData(productionId);
    }
}

module.exports = ProductionService;