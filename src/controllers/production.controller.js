let _productionService = null;

class ProductionController {

    constructor({ ProductionService }) {
        _productionService = ProductionService;
    }

    async getAll(req, res) {
        const { query, sort, skip, limit } = req.query;
        let newQuery = {};
        if (query) {
            newQuery = JSON.parse(query);
            newQuery.name = { $regex: new RegExp(newQuery.name, "i") };
            if (newQuery.genre?.length === 0) {
                delete newQuery.genre;
            } else {
                newQuery.genre = { $in: newQuery.genre }
            }
            newQuery.type = { $regex: new RegExp(newQuery.type, "i") };
        }
        const productions = await _productionService.getAll(newQuery, sort, skip, limit);
        return res.send(productions);
    }

    async create(req, res) {
        const { body } = req;
        const createdProduction = await _productionService.create(body);
        return res.status(201).send(createdProduction);
    }

    async update(req, res) {
        const { body } = req;
        const { productionId } = req.params;
        const updateProduction = await _productionService.update(productionId, body);
        return res.send(updateProduction);
    }

    async delete(req, res) {
        const { productionId } = req.params;
        const deleteProduction = await _productionService.delete(productionId);
        return res.send(deleteProduction);
    }

    async getRandomProduction(req, res) {
        const production = await _productionService.getRandomProduction();
        return res.send(production);
    }

    async getProductionOfTheDay(req, res) {
        const production = await _productionService.getProductionOfTheDay();
        return res.send(production);
    }

    async changeProductionOfTheDay(req, res) {
        const { productionId } = req.params;
        const production = await _productionService.changeProductionOfTheDay(productionId);
        return res.send(production);
    }

}

module.exports = ProductionController;