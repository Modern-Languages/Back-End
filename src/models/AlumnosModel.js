const firebase = require('../config/firebase')


exports.createAlumno = async (alumnoData,escuelaId) => {
  try {
		const AlumnoCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Alumnos')
		const alumno = await AlumnoCollection.doc(alumnoData.Alm_NUA).set(alumnoData)
		console.log('@@ modelo => ', alumno)
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
  
exports.findAlumnoByNUA = async (NUA,escuelaId) => {
	console.log('@@ model => ', NUA)
	try {
		const AlumnoCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Alumnos')
		const Alumno = await AlumnoCollection.where('Alm_NUA', '==', NUA).get()
		//console.log('@@ model => ', userUsuario)
		if (!Alumno.empty) {
			const AlumnoFound = Alumno.docs[0]
			return {
				success: true,
				user: AlumnoFound.data()
			}
		} else {
			return {
				success: false,
				error: 'Alumno not Found'
			}
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.getAllAlumnos = async (escuelaId) => {
	try {
		const AlumnoCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Alumnos')
		const allAlumnos = await AlumnoCollection.get()
		const alumnos = []
		allAlumnos.forEach((doc) => {
			alumnos.push(doc.data())
		})
		return alumnos
	} catch (error) {
		throw new Error('Error getting users: ' + error.message)
	}
}

exports.deleteAlumno = async (NUA,escuelaId) => {
	try {
		const AlumnoCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Alumnos')
		await AlumnoCollection.doc(NUA).delete()
	} catch (error) {
		throw new Error('Error deleting user' + error.message)
	}
}

exports.updateAlumno = async (NUA, alumnoData,escuelaId) => {
	try {
		const AlumnoCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Alumnos')
		await AlumnoCollection.doc(NUA).update(alumnoData)
	} catch (error) {
		throw new Error('Error updating user' + error.message)
	}
}