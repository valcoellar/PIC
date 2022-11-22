const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// ---- Requerimos los routers
const countries = require('./countries.js');
const activity = require('./activity.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// usamos los routers

// ---- Funciones de middleware 
router.use('/countries', countries); 
router.use('/activity', activity);

// para /countries usa router countries
// para /activity usa router activity
// este index.js es requerido por App.js 

module.exports = router;
