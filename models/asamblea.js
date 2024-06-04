const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AsambleaSchema = new Schema({
    fecha_inicio:{
        type: Date,
        required: false
    },
    fecha_fin:{
        type: Date,
        required: false
    }, 
    titulo_asamblea:{
        type: String,
        required: true,
        
    },
    alumnos:[{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'alumno'
    }],
    
    descripcion:{
        type: String,
        required: true,
       
    },
    
    votacion:{
        type: Schema.ObjectId,
        required: false,
        ref: 'votacion'
    },

});


module.exports = mongoose.model('asamblea', AsambleaSchema);
