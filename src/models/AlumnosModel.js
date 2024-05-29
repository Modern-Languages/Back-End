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

exports.agregarAlumnoClase = async (claseId, NUA, escuelaId) => {
    try {
        // Referencia a la colección de clases dentro de la escuela
        const ClaseCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Clases');
        
        // Verificar si la clase existe
        const claseDoc = await ClaseCollection.where('Cla_Id', '==', claseId).get();
        
        if (!claseDoc.empty) {
            // Obtener el primer documento de la clase (asumiendo que solo hay uno)
            const clase = claseDoc.docs[0];
            
            // Obtener datos actuales de alumnos en la clase
            const claseData = clase.data();
            const alumnos = claseData.Cla_Alumnos || [];
            
            // Verificar si el alumno ya está en la clase
            if (!alumnos.includes(NUA)) {
                // Agregar NUA al arreglo de alumnos
                alumnos.push(NUA);
                
                // Actualizar el documento de la clase con el nuevo arreglo de alumnos
                await ClaseCollection.doc(clase.id).update({
                    Cla_Alumnos: alumnos
                });

                return {
                    success: true,
                    message: 'Alumno agregado a la clase correctamente.'
                };
            } else {
                return {
                    success: false,
                    error: 'El alumno ya está registrado en esta clase.'
                };
            }
        } else {
            return {
                success: false,
                error: 'La clase no está registrada.'
            };
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};


  
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