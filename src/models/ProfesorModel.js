const firebase = require('../config/firebase')

exports.createProfesor = async (profesorData,escuelaId) => {
	const ProfesorCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Profesores')
  try {
		const profesor = await ProfesorCollection.doc(profesorData.Pro_Id).set(profesorData)
		console.log('@@ modelo => ', profesor)
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
  
exports.findProfesorById = async (Id,escuelaId) => {
	console.log('@@ model => ', Id)
	const ProfesorCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Profesores')
	try {
		const Profesor = await ProfesorCollection.where('Pro_Id', '==', Id).get()
		//console.log('@@ model => ', userUsuario)
		if (!Profesor.empty) {
			const ProfesorFound = Profesor.docs[0]
			return {
				success: true,
				user: ProfesorFound.data()
			}
		} else {
			return {
				success: false,
				error: 'profesor not Found'
			}
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.getAllProfesores = async (escuelaId) => {
	const ProfesorCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Profesores')
	try {
		const allProfesores = await ProfesorCollection.get()
		const profesores = []
		allProfesores.forEach((doc) => {
			profesores.push(doc.data())
		})
		return profesores
	} catch (error) {
		throw new Error('Error getting users: ' + error.message)
	}
}

exports.deleteProfesor = async (id,escuelaId) => {
	const ProfesorCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Profesores')

	try {
		await ProfesorCollection.doc(id).delete()
	} catch (error) {
		throw new Error('Error deleting user' + error.message)
	}
}

exports.updateProfesor = async (id, profesorData,escuelaId) => {
	const ProfesorCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Profesores')
	try {
		await ProfesorCollection.doc(id).update(profesorData)
	} catch (error) {
		throw new Error('Error updating user' + error.message)
	}
}