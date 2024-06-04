const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AsambleaSchema = new Schema({
    fecha_inicio:{
        type: Date,
        required: true
    },
    fecha_fin:{
        type: Date,
        required: true
    }, 
    titulo_asamblea:{
        type: String,
        required: true,
        ref: 'alumno'
    },
    alumno:{
        type: Schema.ObjectId,
        required: true,
        ref: 'alumno'
    },
    
    descripcion:{
        type: String,
        required: true,
        ref: 'alumno'
    },
    
    duracion:{
        type: String,
        required: true,
        ref: 'votacion'
    },
    votacion:{
        type: Schema.ObjectId,
        required: true,
        ref: 'votacion'
    },

});


module.exports = mongoose.model('asamblea', AsambleaSchema);
