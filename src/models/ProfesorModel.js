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

exports.agregarProfesorClase = async (claseId, profesorId, escuelaId) => {
    try {
        // Referencia a la colección de clases dentro de la escuela
        const ClaseCollection = firebase.firestore().collection('Escuelas').doc(escuelaId).collection('Clases');
        
        // Verificar si la clase existe
        const claseDoc = await ClaseCollection.doc(claseId).get();
        
        if (claseDoc.exists) {
            const claseData = claseDoc.data();
            
            // Verificar si Cla_Profesor es igual a "Pendiente"
            if (claseData.Cla_Profesor === "Pendiente") {
                // Actualizar el campo Cla_Profesor con el ID del profesor
                await ClaseCollection.doc(claseId).update({
                    Cla_Profesor: profesorId
                });

                return {
                    success: true,
                    message: 'Profesor asignado a la clase correctamente.'
                };
            } else {
                return {
                    success: false,
                    error: 'La clase ya tiene un profesor asignado.'
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