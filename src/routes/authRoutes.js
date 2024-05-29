const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const AlumnoController= require('../controllers/AlumnoController')
const ProfesorController= require('../controllers/ProfesorController')
const ClasesController= require('../controllers/ClasesController')
const authMiddleware = require('../middleware/authMiddleware')

//Escuelas
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/get-allusers',authMiddleware,  authController.getAllUsers)
router.delete('/delete-user/:id', authMiddleware, authController.deleteUser)
router.put('/update-user/:id', authMiddleware, authController.updateUser)

//Alumno
router.post('/agregarAlumno/:EscuelaId', AlumnoController.agregar)
router.get('/get-allAlumnos/:EscuelaId',authMiddleware, AlumnoController.getAllAlumnos)
router.delete('/delete-Alumno/:NUA/:EscuelaId',authMiddleware, AlumnoController.deleteAlumno)
router.put('/update-Alumno/:NUA/:EscuelaId',authMiddleware,  AlumnoController.updateAlumno)

//Profesores
router.post('/agregarProfesor/:EscuelaId', ProfesorController.agregar)
router.get('/get-allProfesores/:EscuelaId',authMiddleware ,ProfesorController.getAllProfesores)
router.delete('/delete-Profesor/:Id/:EscuelaId', authMiddleware, ProfesorController.deleteProfesor)
router.put('/update-Profesor/:Id/:EscuelaId', authMiddleware, ProfesorController.updateProfesor)

//Clases
router.post('/agregarClase/:EscuelaId', ClasesController.agregar)
router.get('/get-allClases/:EscuelaId',authMiddleware ,ClasesController.getAllClases)
router.delete('/delete-Clases/:Id/:EscuelaId',authMiddleware, ClasesController.deleteClase)
router.put('/update-Clases/:Id/:EscuelaId',authMiddleware, ClasesController.updateClase)



module.exports = router

