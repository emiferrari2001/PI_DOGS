const getDogs = require('../controllers/getDogs');
const getDogByBreed = require('../controllers/getDogByBreed')
const getTemperaments = require('../controllers/getTemperaments')
const postDog = require('../controllers/postDog')

const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogByBreed);
router.get('/temperament', getTemperaments);
router.post('/dogs', postDog);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
