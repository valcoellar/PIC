// GET /countries__:
// En una primera instancia deberán traer todos los países
// desde restcountries y guardarlos en su propia base de datos
// y luego ya utilizarlos desde allí 
// (Debe retonar sólo los datos necesarios para la ruta principal)
// 
const router = require('express').Router();   // <<-- asi tenemos metodos get y post 
const axios = require('axios');			// <<-- para accesar a la api
const { Op, Sequelize } = require('sequelize'); 
const { Country, Actividad } = require('../db.js') // <<--requerimos los modelos cargdos en db.js


// Referencia
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/


// Primero debemos traer todos los paises desde la API restcountries
// para eso creamos la funcion saparada para poderla usar en otro lado si la 
// requerimos -----  (funcion tomaTodosDeApi)  ----

const tomaTodosDeApi = async () => { 
  const paises = await Country.findAll({
    attributes: ["id", "name", "flag", "continents", "capital", "subregion", "area", "population"],
  });
  if (!paises.length) {
    var allCountry = await axios.get("https://restcountries.com/v3/all");
    allCountry = allCountry.data
    allCountry = allCountry.map((idx) => {

      return {
            id: idx.cca3,
            name: idx.name.common,
            flag: idx.flags.find((e)=>e.includes('svg')),  
            continents: idx.region,
            capital: idx.capital,
            subregion: idx.subregion,
            area: idx.area,
            population: idx.population,
      }
    });
    await Country.bulkCreate(allCountry);
    return allCountry;
  } else {
    return paises
  }};

// ------------ fin de funcion tomaTodosDeApi ------------------

// router.get('/', (req, res) => {
//   Dog.findAll().then((data) => {
//     res.json(data);
//   });
// });
//
// [Op.xxx] sintax Fuente:
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/





//	****************** ruta /
router.get('/', async function (req,res)  {  // <<--traer todos los paisese y guardarlos en BD
	await tomaTodosDeApi();    // invocamos la funcion con await(porque es un proceso asincrono
					// asi esperamos a que se realize y luego continua

const { name } = req.query; 	  // capturamos el query 

if (!name) {			// Si el query esta vacio  muestra todos los paises

	try {
		 // 	************ Ruta /countries?name="..."

// if (nombre){res.send('query detectado')  }
// Express www.com/index?nombredevalor1=valor1&nombredevalor2=valor2
// http://localhost:3001/countries?name=mex	

		//	****************************************

		// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
		const paises = await Country.findAll({attributes: ['id','name','flag','continents','population']});      

		// filtramos unicamente el nombre de los paises 
		let Resultado=[];
		paises.map(function (index, element){
		Resultado.push(index.name,index.flag,index.continents,index.population);
		})
		// --------------------------------------------

   		
//if (paises.lenght){res.status(200).json(Resultado)}
//{res.status(404).send(name)}

		 //    devuelve un listado de los nombres de los paises
			//	 res.send(JSON.stringify(paises));   // solucion anterior, devuelve { name: 'pais' }
		 res.status(200);    //todo ok
		 res.json(paises); //resultado, si colocamos Resultado es una lista filtrada, no en formato JSON
	
		} catch (error) {
			/* handle error */
			res.status(404).send('El nombre del pais no se encuentra');
		}
		// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
}
else{	// Si no esta vacio el query entonces busca el pais y lo muestra
	try {
	const DatosPaisBuscado = await Country.findAll({
        
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: Actividad,
      	});

// si DatosPaisBuscado === 0 entonces envia mensaje de error // si todo OK, entonces envia la info del pais
DatosPaisBuscado.length ? res.status(200).json(DatosPaisBuscado) : res.status(404).send("El pais no se encuentra");

	} catch (error) {
	/* handle error */
	res.status(404).send('-Pais No se Encuentra-')
	}
}

}); 
//	******************************************


//	************** ruta/:idPais
//
//  - Obtener el detalle de un país en particular
//  - Debe traer solo los datos pedidos en la ruta de detalle de país
//  - Incluir los datos de las actividades turísticas correspondientes

router.get('/:idPais', async function (req,res)  {
	const { idPais } = req.params; 
await tomaTodosDeApi(); 
let idMayusculas = idPais.toUpperCase();
try {


let getPaisPorId = await Country.findByPk(idMayusculas, {
      include: Actividad,
    });

// paisPorId ? res.json(paisPorId) : res.sendStatus(404);
	res.json(getPaisPorId);
	

} catch (error) {
	/* handle error */
	res.status(400).send(error);
}





}); 
//	******************************************


// 	************ Ruta /countries?name="..."
//
// - Obtener los países que coincidan con el nombre pasado como query parameter
//   (No necesariamente tiene que ser una matcheo exacto)
// - Si no existe ningún país mostrar un mensaje adecuado
//


//	******************************************

module.exports = router;

