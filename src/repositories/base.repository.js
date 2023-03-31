class BaseRepository {

    constructor(model) {
        this.model = model
    }

    async get(id) {
        return await this.model.findById(id);
    }

    async getAll(query = {}, sort = {}, skip = 1, limit = 10) {
        const start = limit * (skip - 1);
        return await this.model.find(query).skip(start).limit(limit).sort(sort);
    }

    async create(entity) {
        return await this.model.create(entity);
    }

    async update(id, entity) {
        return await this.model.findByIdAndUpdate(id, entity, { new: true, context: 'query', runValidators: true });
    }

    async delete(id) {
        await this.model.findByIdAndDelete(id);
        return true;
    }

}

module.exports = BaseRepository;