const firebase = require('../config/firebase')

exports.createClase = async (claseData,escuelaId) => {
	const ClaseCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Clases')
  try {
		const clase = await ClaseCollection.doc(claseData.Cla_Id).set(claseData)
		console.log('@@ modelo => ', clase)
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
  
exports.findClaseById = async (Id,escuelaId) => {
	console.log('@@ model => ', Id)
	const ClaseCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Clases')
	try {
		const Clase = await ClaseCollection.where('Pro_Id', '==', Id).get()
		//console.log('@@ model => ', userUsuario)
		if (!Clase.empty) {
			const ClaseFound = Clase.docs[0]
			return {
				success: true,
				user: ClaseFound.data()
			}
		} else {
			return {
				success: false,
				error: 'Clase not Found'
			}
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.getAllClases = async (escuelaId) => {
	const ClaseCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Clases')
	try {
		const allClases = await ClaseCollection.get()
		const Clases = []
		allClases.forEach((doc) => {
			Clases.push(doc.data())
		})
		return Clases
	} catch (error) {
		throw new Error('Error getting users: ' + error.message)
	}
}

exports.deleteClase = async (id,escuelaId) => {
	const ClaseCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Clases')

	try {
		await ClaseCollection.doc(id).delete()
	} catch (error) {
		throw new Error('Error deleting user' + error.message)
	}
}

exports.updateClase = async (id, ClaseData,escuelaId) => {
	const ClaseCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Clases')
	try {
		await ClaseCollection.doc(id).update(ClaseData)
	} catch (error) {
		throw new Error('Error updating user' + error.message)
	}
}