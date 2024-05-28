const bcrypt = require('bcrypt')
const { createClase, findClaseById, getAllClases, deleteClase, updateClase } = require('../services/ClasesService')

exports.agregar = async (req, res) => {
  try {
		// Codigo para registrarse
		const escuelaId = req.params.EscuelaId
		console.log('escuelaid', escuelaId)
		const { Cla_Id, Cla_Nombre, Cla_Profesor,Cla_Alumnos } = req.body
		const existingClase = await findClaseById(Cla_Id,escuelaId)
		if (existingClase.success) {
			return res.status(400).json({																		
				message: 'El Clase ya esta registrado'
			})
		}

		const newUser = {
			Cla_Id: Cla_Id,
			Cla_Nombre: Cla_Nombre,
			Cla_Profesor: Cla_Profesor,
			Cla_Alumnos: Cla_Alumnos

		}

		const ClaseResult = await createClase(newUser,escuelaId)
		console.log('@@@ result => ', ClaseResult)
		if (ClaseResult.success) {
			res.status(201).json({
				message: 'Usuario Registrado Satisfactoriamente'
			})
		} else {
			res.status(500).json({
				message: 'Error al registrar usuario'
			})
		}
	} catch (error) {
		res.status(500).json({
				message: error.message
		})
	}
}
exports.getAllClases = async (req, res) => {
	try {
		const escuelaId = req.params.EscuelaId
		const users = await getAllClases(escuelaId)
		res.status(200).json({
			message: 'Success',
			users
		})
	} catch (error) {
		res.status(500).json({
			message: 'Server Error Getting all Users',
			error: error.message
		})
	}
}

exports.updateClase = async (req, res) => {
	try {
		const escuelaId = req.params.EscuelaId
		const Id = req.params.Id
		console.log('escuela',escuelaId,Id)
		const ClaseData = req.body
		await updateClase(Id, ClaseData,escuelaId)
		res.status(200).json({
			message: 'Clase updated successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Clase updating user',
			error: error.message
		})
	}
}

exports.deleteClase = async (req, res) => {
	
	try {
		const escuelaId = req.params.EscuelaId
		const Id = req.params.Id
		console.log('user ',Id);
		await deleteClase(Id,escuelaId)
		res.status(200).json({
			message: 'Clase deleted successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting user',
			error: error.message
		})
	}
}