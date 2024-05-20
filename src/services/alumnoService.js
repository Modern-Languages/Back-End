const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createAlumno, findAlumnoByNUA, getAllAlumnos, deleteAlumno, updateAlumno } = require('../models/AlumnosModel')
require('dotenv').config()

exports.createAlumno = async (AlumnoData) => {
	console.log('@@ userData => ', AlumnoData)
	try {
		const createdAlumno = await createAlumno(AlumnoData)
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
exports.findAlumnoByNUA = async (NUA) => {
	console.log('@@ email => service => ', NUA)
	try {
		const found = await findAlumnoByNUA(NUA)
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
exports.getAllAlumnos = async () => {
	try {
		const alumnos = await getAllAlumnos()
		return alumnos
	} catch (error) {
		throw new Error('Error Getting Users: ' + error.message)
	}
}

exports.deleteAlumno = async (NUA) => {
	try {
		console.log('NUA', NUA)
		await deleteUser(NUA)
	} catch (error) {
		throw new Error('Error Deliting Alumno' + error.message)
	}
}

exports.updateAlumno = async (NUA, alumnoData) => {
	try {
		await updateUser(NUA, alumnoData)
	} catch (error) {
		throw new Error('Error Updating Alumno' + error.message)
	}
}