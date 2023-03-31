const BaseRepository = require("./base.repository");
let _production = null;
let _rating = null;
class ProductionRepository extends BaseRepository {

    constructor({ Production, Rating }) {
        super(Production, Rating);
        _production = Production;
        _rating = Rating;
    }

    async getRandomProduction() {
        const count = await _production.count();
        const number = Math.floor(Math.random() * count);
        let randomProduction = await _production.find({}).skip(number).limit(1);
        return randomProduction[0];
    }

    async updateProductionRating(ratingAdded, productionId) {
        let production = await _production.findOne({ _id: productionId });
        production.rating = (Math.ceil(production.rating * production.ratingsNumber) + ratingAdded) / (production.ratingsNumber + 1);
        production.ratingsNumber += 1;
        return await production.save();
    }

    async getProductionOfTheDay() {
        return await _production.findOne({ productionOfTheDay: true });
    }

    async changeProductionOfTheDay(productionId) {
        let production = await _production.findOne({ productionOfTheDay: true });
        production.productionOfTheDay = false;
        await production.save();
        production = await _production.findOne({ _id: productionId });
        production.productionOfTheDay = true;
        await production.save();
        return production;
    }

    async updateProductionData(productionId) {
        let ratings = await _rating.find({ production: productionId });
        let production = await _production.findOne({ _id: productionId });
        production.visualizations = 0;
        production.ratingsNumber = 0;
        production.rating = 0;
        for (const rating of ratings) {
            if (rating.value) {
                production.ratingsNumber += 1;
                production.rating += rating.value;
            }

            if (rating.viewed) {
                production.visualizations += 1;
            }
        }
        if (production.ratingsNumber > 0) {
            production.rating = production.rating / production.ratingsNumber;
        }
        return await production.save();
    }

}

module.exports = ProductionRepository;