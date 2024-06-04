const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlumnoSchema = new Schema({
    nombre:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    apellido:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    
    carrera:[{
        type: Schema.Types.ObjectId,
        ref: 'carrera'
    }],
    numero:{
        type: Number,
        required: true
    },
    correo: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 250
    },
    status:{
        type: String,
        required: true,
        enum: [
            'Regular',
            'No regular'

        ]
    }
});

module.exports = mongoose.model('alumno', AlumnoSchema);
