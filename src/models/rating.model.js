const { Schema, model } = require('mongoose');

const RatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'El id del usuario autor de la calificación es necesario'],
        autopopulate: true
    },
    value: {
        type: Number,
        default: 0
    },
    viewed: {
        type: Boolean,
        default: false
    },
    production: {
        type: Schema.Types.ObjectId,
        ref: 'production',
        required: [true, 'El id de la producción que esta siendo calificada es necesario'],
        autopopulate: true
    }
},
    {
        timestamps: true
    });

RatingSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('rating', RatingSchema);