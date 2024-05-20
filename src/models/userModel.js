const firebase = require('../config/firebase')
const usersCollection = firebase.firestore().collection('Escuelas')

exports.createUser = async (userData) => {
	
  try {
		const user = await usersCollection.doc(userData.sch_usuario).set(userData)
		console.log('@@ modelo => ', user)
		return {
			success: true
		} 
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.findUserById = async (userId) => {
	try {
		const userFound = await usersCollection.doc(userId).get()
		if (userFound.exists) {
			return {
				success: true,
				user: userDoc.data()
			}
		} else {
			return {
				success: false,
				error: 'User not Found'
			}
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.findUserByUsuario = async (usuario) => {
	console.log('@@ model => ', usuario)
	try {
		const userUsuario = await usersCollection.where('sch_usuario', '==', usuario).get()
		//console.log('@@ model => ', userUsuario)
		if (!userUsuario.empty) {
			const userFound = userUsuario.docs[0]
			return {
				success: true,
				user: userFound.data()
			}
		} else {
			return {
				success: false,
				error: 'User not Found'
			}
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.getAllUsers = async () => {
	try {
		const allUsers = await usersCollection.get()
		const users = []
		allUsers.forEach((doc) => {
			users.push(doc.data())
		})
		return users
	} catch (error) {
		throw new Error('Error getting users: ' + error.message)
	}
}

exports.deleteUser = async (userId) => {
	try {
		await usersCollection.doc(userId).delete()
	} catch (error) {
		throw new Error('Error deleting user' + error.message)
	}
}

exports.updateUser = async (userId, userData) => {
	try {
		await usersCollection.doc(userId).update(userData)
	} catch (error) {
		throw new Error('Error updating user' + error.message)
	}
}