const { query } = require('express');
const Votacion = require('../models/votacion.js');
const Asamblea = require('../models/asamblea');
const Alumno = require('../models/alumno.js');

const createVotacion = (req, res) =>{
    const {nombre,aforo,descripcion,tiempoMaximoDeVotacion, status} = req.body;
    const newVotacion = new Votacion({
        nombre,
        aforo,
        descripcion,
        tiempoMaximoDeVotacion,
        status
    });
}

const getVotacion = (req, res) =>{
    Votacion.find({},(error, votaciones)=>{
        if(error){
            return res.status(400).send({ message:'Error al obtener el votacion'})
        }
        return res.status(200).send(votaciones)
    })
}

const getSpecificVotacion = (req, res) => {
    const { id } = req.params;
    Votacion.findById(id).populate({ path: 'category' }).exec((error, votacion) => {
        if (error) {
            return res.status(400).send({ message: "Error al buscar votacion" })
        }
        if (!votacion) {
            return res.status(404).send({ message: "Votacion no encontrada" })
        }
        return res.status(200).send(votacion)
    })
}

const changeStatus = (req, res) => {
    const { id } = req.params
    const query = Votacion.findById(id)
    query.exec((error, Votacion) => {
        if(error){
            return res.status(400).send({ message: "No se pudo actualizar la votacion" })
        }
        if(Votacion.status === 'Cerrada'){
            Votacion.updateOne({status: 'Disponible'}).exec((error) => {
                if(error){
                    return res.status(400).send({ message: "No se pudo actualizar la votacion" })
                }
                return res.status(200).send({ message: "Status actualizado votacion abierta" })
            })
        }
        else{
            Votacion.updateOne({status: 'cerrada'}).exec((error) => {
                if(error){
                    return res.status(400).send({ message: "No se pudo actualizar la votacion" })
                }
                return res.status(200).send({ message: "Status actualizado a votacion cerrada" })
            })

        }
    })
}

const updateVotacion = (req, res) => {
    const { id } = req.params;
    Votacion.findByIdAndUpdate(id, req.body, (error, votacion) => {
        if (error) {
            return res.status(400).send({ message: "Error al buscar votacion" })
        }
        if (!votacion) {
            return res.status(404).send({ message: "Votacion no encontrada" })
        }
        return res.status(200).send(votacion)
    })
}

const deleteVotacion= (req, res) => {
    const { id } = req.params;
    Votacion.findByIdAndDelete(id, (error, votacion) => {
        if (error) {
            return res.status(400).send({ message: "Error al obtener el votacion" })
        }
        if (!votacion) {
            return res.status(404).send({ message: "Votacion no encontrado" })
        }
        return res.status(200).send(votacion)
    })
}

const votoController = {
    // Función para obtener los datos de alumno y asamblea
    obtenerDatosAlumnoYAsamblea: async (req, res) => {
        try {
            // Obtener datos del alumno (aquí asumo que tienes un método para obtener todos los alumnos)
            const alumnos = await Alumno.find();

            // Obtener datos de la asamblea (aquí asumo que tienes un método para obtener la asamblea activa)
            const asamblea = await Asamblea.findOne({ activa: true });

            // Si los datos se obtienen correctamente, responder con ellos
            res.json({ alumnos, asamblea });
        } catch (error) {
            // Si hay algún error, responder con un mensaje de error
            res.status(500).json({ error: 'Error al obtener los datos de alumno y asamblea' });
        }
    }
};

const crearvotacion = {
    // Función para crear una nueva votación con datos de asamblea
    createVotacionWithAsamblea: async (req, res) => {
        try {
            // Extrae los datos de la votación y la asamblea del cuerpo de la solicitud
            const { datosVotacion, datosAsamblea } = req.body;

            // Crea una nueva instancia del modelo de datos de Votacion con los datos recibidos
            const nuevaVotacion = new Votacion(datosVotacion);

            // Busca la asamblea activa en la base de datos
            const asambleaActiva = await Asamblea.findOne({ activa: true });

            // Si no se encuentra una asamblea activa, responde con un error
            if (!asambleaActiva) {
                return res.status(400).json({ error: 'No hay asamblea activa' });
            }

            // Asigna la asamblea activa a la nueva votación
            nuevaVotacion.asamblea = asambleaActiva._id;

            // Guarda la nueva votación en la base de datos
            await nuevaVotacion.save();

            // Responde con la nueva votación creada
            res.status(201).json({ message: 'Votación creada con éxito', votacion: nuevaVotacion });
        } catch (error) {
            // Si hay algún error, responde con un mensaje de error
            console.error(error);
            res.status(500).json({ error: 'Error al crear la votación' });
        }
    }
};






module.exports = {
    createVotacion,
    getVotacion,
    changeStatus,
    getSpecificVotacion,
    updateVotacion,
    deleteVotacion,
    votoController,
    crearvotacion,
}