const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createProfesor, findProfesorById, getAllProfesores, deleteProfesor, updateProfesor } = require('../models/ProfesorModel')
require('dotenv').config()

exports.createProfesor = async (ProfesorData,escuelaId) => {
	console.log('@@ profesorData => ', ProfesorData)
	try {
		const createdProfesor = await createProfesor(ProfesorData,escuelaId)
		console.log('@@@ service => ', createdProfesor)
		if (createdProfesor.success) {
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
exports.findProfesorById = async (Id,escuelaId) => {
	console.log('@@ id profesor => service => ', Id)
	try {
		const found = await findProfesorById(Id,escuelaId)
		if (found.success) {
			return {
				success: true,
				user: found.user
			}
		}
		return {
			success: false,
			message: 'Profesor No Encontrado'
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}
exports.getAllProfesores = async (escuelaId) => {
	try {
		const Profesores = await getAllProfesores(escuelaId)
		return Profesores
	} catch (error) {
		throw new Error('Error Getting Users: ' + error.message)
	}
}

exports.deleteProfesor = async (Id,escuelaId) => {
	try {
		console.log('Id', Id)
		await deleteProfesor(Id,escuelaId)
	} catch (error) {
		throw new Error('Error Deliting Profesor' + error.message)
	}
}

exports.updateProfesor = async (Id, profesorData,escuelaId) => {
	try {
		await updateProfesor(Id, profesorData,escuelaId)
	} catch (error) {
		throw new Error('Error Updating Profesor' + error.message)
	}
}