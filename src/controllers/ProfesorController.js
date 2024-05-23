const bcrypt = require('bcrypt')
const { createProfesor, findProfesorById, getAllProfesores, deleteProfesor, updateProfesor } = require('../services/ProfesorService')

exports.agregar = async (req, res) => {
  try {
		// Codigo para registrarse
		const escuelaId = req.params.EscuelaId
		console.log('escuelaid', escuelaId)
		const { Pro_Id, Pro_Nombre, Pro_Class,Pro_Gen,Pro_Password,Pro_Designacion,Pro_Email,Pro_telefono, Pro_Sujeto } = req.body
		const existingProfesor = await findProfesorById(Pro_Id,escuelaId)
		if (existingProfesor.success) {
			return res.status(400).json({
				message: 'El Profesor ya esta registrado'
			})
		}

		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(Pro_Password, saltRounds)

		const newUser = {
			Pro_Id: Pro_Id,
			Pro_Nombre: Pro_Nombre,
			Pro_Class: Pro_Class,
			Pro_Gen: Pro_Gen,
			Pro_Password: hashedPassword,
			Pro_Designacion: Pro_Designacion,
			Pro_Email: Pro_Email,
			Pro_telefono: Pro_telefono,
			Pro_Sujeto: Pro_Sujeto

		}

		const ProfesorResult = await createProfesor(newUser,escuelaId)
		console.log('@@@ result => ', ProfesorResult)
		if (ProfesorResult.success) {
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
exports.getAllProfesores = async (req, res) => {
	try {
		const escuelaId = req.params.EscuelaId
		const users = await getAllProfesores(escuelaId)
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

exports.updateProfesor = async (req, res) => {
	try {
		const escuelaId = req.params.EscuelaId
		const Id = req.params.Id
		const profesorData = req.body
		await updateProfesor(Id, profesorData,escuelaId)
		res.status(200).json({
			message: 'Profesor updated successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Profesor updating user',
			error: error.message
		})
	}
}

exports.deleteProfesor = async (req, res) => {
	
	try {
		const escuelaId = req.params.EscuelaId
		const Id = req.params.Id
		console.log('user ',Id);
		await deleteProfesor(Id,escuelaId)
		res.status(200).json({
			message: 'Profesor deleted successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting user',
			error: error.message
		})
	}
}