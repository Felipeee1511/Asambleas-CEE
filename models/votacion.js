const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VotacionSchema = new Schema({
    
    // titulo: { type: String, required: true },
    // descripcion: { type: String, required: true },
    opciones: [{ type: String, required: true }],
    // Hacer el campo nombre opcional
    votacion_opcion: { type: String, required: false },
   
    
    asamblea_votacion: [{
        type: Schema.Types.ObjectId,
        ref: 'asamblea'
    }]
});



module.exports =  mongoose.model('votacion',VotacionSchema);
