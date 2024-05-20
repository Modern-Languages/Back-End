const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const AlumnoController= require('../controllers/AlumnoController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/get-allusers', authMiddleware, authController.getAllUsers)
router.delete('/delete-user/:id', authMiddleware, authController.deleteUser)
router.put('/update-user/:id', authMiddleware, authController.updateUser)

//usuarios
router.post('/agregarAlumno', AlumnoController.agregar)
router.get('/get-allAlumnos', AlumnoController.getAllAlumnos)
router.delete('/delete-Alumno/:NUA', authMiddleware, AlumnoController.deleteAlumno)
router.put('/update-Alumno/:NUA', authMiddleware, AlumnoController.updateAlumno)


module.exports = router

