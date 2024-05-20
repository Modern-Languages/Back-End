const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { createAlumno, findAlumnoByNUA, getAllAlumnos, deleteAlumno, updateAlumno } = require('../services/alumnoService')

exports.agregar = async (req, res) => {
  try {
		// Codigo para registrarse
		const {Alm_NUA,Alm_Password,Alm_Nombre, Alm_ApellidoP, Alm_ApellidoM,Alm_Email,Alm_telefono } = req.body
		const existingAlumno = await findAlumnoByNUA(Alm_NUA)
		if (existingAlumno.success) {
			return res.status(400).json({
				message: 'El usuario ya esta registrado'
			})
		}

		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(Alm_Password, saltRounds)

		const newUser = {
			Alm_NUA: Alm_NUA,
			Alm_Password: hashedPassword,
			Alm_Nombre: Alm_Nombre,
			Alm_ApellidoP: Alm_ApellidoP,
			Alm_ApellidoM: Alm_ApellidoM,
			Alm_Email: Alm_Email,
			Alm_telefono: Alm_telefono,
			// agregar otros campos
		}

		const AlumnoResult = await createAlumno(newUser)
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
		const users = await getAllAlumnos()
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
		const NUA = req.params.Alm_NUA
		const alumnoData = req.body
		await updateUser(NUA, alumnoData)
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
		const NUA = req.params.Alm_NUA
		console.log('user ',NUA);
		await deleteUser(NUA)
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