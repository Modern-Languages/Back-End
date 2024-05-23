const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { createAlumno, findAlumnoByNUA, getAllAlumnos, deleteAlumno, updateAlumno } = require('../services/alumnoService')

exports.agregar = async (req, res) => {
  try {
		// Codigo para registrarse
		const escuelId = req.params.EscuelaId
		const {Alm_NUA,Alm_Nombre,Alm_Genero,Alm_Clase,Alm_Email,Alm_telefono } = req.body
		const existingAlumno = await findAlumnoByNUA(Alm_NUA,escuelId)
		if (existingAlumno.success) {
			return res.status(400).json({
				message: 'El usuario ya esta registrado'
			})
		}

		const newUser = {
			Alm_NUA: Alm_NUA,
			Alm_Nombre: Alm_Nombre,
			Alm_Genero: Alm_Genero,
			Alm_Clase: Alm_Clase,
			Alm_Email: Alm_Email,
			Alm_telefono: Alm_telefono
		}

		const AlumnoResult = await createAlumno(newUser,escuelId)
		console.log('@@@ result => ', AlumnoResult)
		if (AlumnoResult.success) {
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
exports.getAllAlumnos = async (req, res) => {
	try {
		const escuelId = req.params.EscuelaId
		const users = await getAllAlumnos(escuelId)
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

exports.updateAlumno = async (req, res) => {
	try {

		const escuelId = req.params.EscuelaId
		const NUA = req.params.NUA
		console.log('nua',NUA)
		console.log('escuela',escuelId)
		const alumnoData = req.body
		await updateAlumno(NUA, alumnoData,escuelId)
		res.status(200).json({
			message: 'Alumno updated successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Alumno updating user',
			error: error.message
		})
	}
}

exports.deleteAlumno = async (req, res) => {
	try {
		const escuelId = req.params.EscuelaId
		const NUA = req.params.NUA
		console.log('user ',NUA);
		await deleteAlumno(NUA,escuelId)
		res.status(200).json({
			message: 'Alumno deleted successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting user',
			error: error.message
		})
	}
}