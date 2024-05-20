const firebase = require('../config/firebase')
escuelaId= 'Ug' 
const AlumnoCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Alumnos')

exports.createAlumno = async (alumnoData) => {
  try {
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
  
exports.findAlumnoByNUA = async (NUA) => {
	console.log('@@ model => ', NUA)
	try {
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

exports.getAllAlumnos = async () => {
	try {
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

exports.deleteAlumno = async (NUA) => {
	try {
		await AlumnoCollection.doc(Alm_NUA).delete()
	} catch (error) {
		throw new Error('Error deleting user' + error.message)
	}
}

exports.updateAlumno = async (NUA, alumnoData) => {
	try {
		await AlumnoCollection.doc(Alm_NUA).update(alumnoData)
	} catch (error) {
		throw new Error('Error updating user' + error.message)
	}
}