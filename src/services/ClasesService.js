const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createClase, findClaseById, getAllClases, deleteClase, updateClase } = require('../models/ClasesModel')
require('dotenv').config()

exports.createClase = async (ClaseData,escuelaId) => {
	console.log('@@ ClaseData => ', ClaseData)
	try {
		
		const createdClase = await createClase(ClaseData,escuelaId)
		console.log('@@@ service => ', createdClase)
		if (createdClase.success) {
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
exports.findClaseById = async (Id,escuelaId) => {
	console.log('@@ id Clase => service => ', Id)
	try {
		const found = await findClaseById(Id,escuelaId)
		if (found.success) {
			return {
				success: true,
				user: found.user
			}
		}
		return {
			success: false,
			message: 'Clase No Encontrado'
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}
exports.getAllClases = async (escuelaId) => {
	try {
		const Clases = await getAllClases(escuelaId)
		return Clases
	} catch (error) {
		throw new Error('Error Getting Users: ' + error.message)
	}
}

exports.deleteClase = async (Id,escuelaId) => {
	try {
		console.log('Id', Id)
		await deleteClase(Id,escuelaId)
	} catch (error) {
		throw new Error('Error Deliting Clase' + error.message)
	}
}

exports.updateClase = async (Id, ClaseData,escuelaId) => {
	try {
		await updateClase(Id, ClaseData,escuelaId)
	} catch (error) {
		throw new Error('Error Updating Clase' + error.message)
	}
}