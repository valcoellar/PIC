const router = require('express').Router();   // <<-- asi tenemos metodos get y post 
const axios = require('axios');			// <<-- para accesar a la api
const { Op, Sequelize } = require('sequelize'); 
const { Country, Actividad } = require('../db.js')




router.get('/', (req, res, next) => {
    return Actividad.findAll({})
    .then((createdActivities) => {
        res.json(createdActivities)
    })
    .catch((error) => {
        next(error)
    }) 
})





//	- [ ] __POST /activities__:
//	- Recibe los datos recolectados desde el formulario
//	 controlado de la ruta de creación de actividad turística por body
//	- Crea una actividad turística en la base de datos, relacionada con los países correspondientes
// 
// id, name, difficulty, duration, season 
// Express www.com/index?nombredevalor1=valor1&nombredevalor2=valor2

//	cadena de prueba
// localhost:3001/activity?name="prueba"&dificulty=1&duration=20&season="invierno"
// localhost:3001/activity:name="prueba"&dificulty=1&duration=20&season="invierno"

// http://localhost:3001/countries/activity?name=prueba&dificulty=1&duration=20&season=invierno

// test post method with curl
//curl -X POST http://localhost:3001/countries/activity?name=prueba&dificulty=1&duration=20&season=invierno

let idDeActividad = 1;

router.post('/post', async function (req,res)  {
 const { name, difficulty, duration, season, country } = req.body;

// Sequelize provides the create method
// which combines the build and save methods 
try {
	
		const crearActividad = await Actividad.create({
		id: idDeActividad++,		
		name: name,
    		difficulty: difficulty,
    		duration: duration,
    		season: season,
		country: country
		})
	crearActividad.addCountries(country)

//  crearActividad.addCountries(country)	
	//  crearActividad == al objeto de la actividad
	//  addCountries == es la add+tabla 
	//  country es el id del pais 
	//  con esto agregamos la actividad al pais correspondiente.

	
	//

//res.json('la cadena es  ' + name + difficulty + duration + season + country )
	res.json(crearActividad); // retornamos el objeto creado
} catch (error) {
	/* handle error */
	res.status(404).send(error);
}
})









module.exports = router;
