const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { createUser, findUserByUsuario, getAllUsers, deleteUser, updateUser } = require('../services/userService')

exports.signup = async (req, res) => {
  try {
		// Codigo para registrarse
		const { sch_email, sch_password, sch_usuario,sch_nombre,sch_direccion,sch_telefono,sch_estado,sch_municipio } = req.body
		const existingUser = await findUserByUsuario(sch_usuario)
		if (existingUser.success) {
			return res.status(400).json({
				message: 'El usuario ya esta registrado'
			})
		}

		const saltRounds = 10
		const hashedPassword = await bcrypt.hash(sch_password, saltRounds)

		const newUser = {
			sch_email: sch_email,
			sch_password: hashedPassword,
			sch_usuario: sch_usuario,
			sch_nombre: sch_nombre,
			sch_direccion: sch_direccion,
			sch_telefono: sch_telefono,
			sch_estado: sch_estado,
			sch_municipio: sch_municipio
			// agregar otros campos
		}

		const userResult = await createUser(newUser)
		console.log('@@@ result => ', userResult)
		if (userResult.success) {
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

exports.login = async (req, res) => {
	try {
		// Codigo para loggearnos
		const { sch_usuario, sch_password } = req.body
		const findUsuario = await findUserByUsuario(sch_usuario)

		if (!findUsuario.success) {
			return res.status(401).json({
				message: 'Usuario no encontrado'
			})
		}
		//console.log('password',sch_password)
		const sch_user = findUsuario.user
		//console.log('@@@ controller => ',  sch_password,  sch_user.password)
		const findPassword = await bcrypt.compare(sch_password, sch_user.sch_password)
		 console.log('@@@ findPassword => ', findPassword)

		if (!findPassword) {
			return res.status(401).json({
				message: 'Password Incorrecto'
			})
		}

		const token = jsonwebtoken.sign({
			sch_usuario: sch_user.usuario,
			sch_nombre: sch_user.nombre
		}, process.env.TOP_SECRET, {
			expiresIn: '1h'
		})
		console.log('@@ token => ', token)
		res.status(200).json({
			token: token,
			message: 'Success'
		})
	} catch (error) {
		res.status(500).json({
				message: error.message
		})
	}
}

exports.getAllUsers = async (req, res) => {
	try {
		const users = await getAllUsers()
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

exports.updateUser = async (req, res) => {
	try {
		const userId = req.params.sch_user
		const userData = req.body
		await updateUser(userId, userData)
		res.status(200).json({
			message: 'User updated successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Error updating user',
			error: error.message
		})
	}
}

exports.deleteUser = async (req, res) => {
	try {
		const userId = req.params.sch_user
		console.log('user ',userId);
		await deleteUser(userId)
		res.status(200).json({
			message: 'User deleted successfully'
		})
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting user',
			error: error.message
		})
	}
}