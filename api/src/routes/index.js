const getDogs = require('../controllers/getDogs');
const getDogByBreed = require('../controllers/getDogByBreed')
const getDogByName = require('../controllers/getDogByName')

const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
console.log('llega a rutas?')

router.get('/', getDogs);
router.get('/:id', getDogByBreed);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
