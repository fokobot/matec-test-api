const { Schema, model } = require('mongoose');

const ProductionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Es necesario un nombre']
    },
    genre: {
        type: String,
        enum: [
            'Acción',
            'Aventura',
            'Animación',
            'Comedia',
            'Documental',
            'Drama',
            'Fantasía',
            'Horror',
            'Musical',
            'Misterio',
            'Romántico',
            'Ciencia ficción',
            'Suspense',
            'Thriller',
            'Western'
        ],
        required: [true, 'Es necesario el género de la producción']
    },
    type: {
        type: String,
        enum: [
            'Pelicula',
            'Serie'
        ],
        required: [true, 'Es necesario el tipo de la producción']
    },
    visualizations: {
        type: Number,
        default: 0
    },
    ratingsNumber: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    productionOfTheDay: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

module.exports = model('production', ProductionSchema);