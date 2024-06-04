const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VotacionSchema = new Schema({
    
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    opciones: [{ type: String, required: true }],
    // Hacer el campo nombre opcional
    nombre: { type: String, required: false },
   
    
    alumnos: [{
        type: Schema.Types.ObjectId,
        ref: 'alumno'
    }]
});



module.exports =  mongoose.model('votacion',VotacionSchema);
