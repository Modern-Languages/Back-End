const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createAlumno,agregarAlumnoClase ,findAlumnoByNUA, getAllAlumnos, deleteAlumno, updateAlumno } = require('../models/AlumnosModel')
require('dotenv').config()

exports.createAlumno = async (AlumnoData,escuelId) => {
	console.log('@@ userData => ', AlumnoData)
	try {
		const createdAlumno = await createAlumno(AlumnoData,escuelId)
		console.log('@@@ service => ', createdAlumno)
		if (createdAlumno.success) {
			return {
				success: true
			}
		}
		return {
			success: false,
			message: 'Error al registrar'
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.agregarAlumnoClase = async (claseId, NUA, escuelaId) => {
	try {
		const agregarAlumno = await agregarAlumnoClase(claseId, NUA, escuelaId)
		if (agregarAlumno.success) {
			return {
				success: true
			}
		}
		return {
			success: false,
			message: 'Error al registrar'
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}
exports.findAlumnoByNUA = async (NUA,escuelId) => {
	console.log('@@ email => service => ', NUA)
	try {
		const found = await findAlumnoByNUA(NUA,escuelId)
		if (found.success) {
			return {
				success: true,
				user: found.user
			}
		}
		return {
			success: false,
			message: 'Alumno No Encontrado'
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}
exports.getAllAlumnos = async (escuelId) => {
	try {
		const alumnos = await getAllAlumnos(escuelId)
		return alumnos
	} catch (error) {
		throw new Error('Error Getting Users: ' + error.message)
	}
}

exports.deleteAlumno = async (NUA,escuelId) => {
	try {
		console.log('NUA', NUA)
		await deleteAlumno(NUA,escuelId)
	} catch (error) {
		throw new Error('Error Deliting Alumno' + error.message)
	}
}

exports.updateAlumno = async (NUA, alumnoData,escuelId) => {
	try {
		await updateAlumno(NUA, alumnoData,escuelId)
	} catch (error) {
		throw new Error('Error Updating Alumno' + error.message)
	}
}