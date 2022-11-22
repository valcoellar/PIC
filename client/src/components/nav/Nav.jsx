import React from 'react';
import {Link} from 'react-router-dom';
import stylos from './Nav.module.css'


// 1.- importar los use
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//-----------------------------------

// 2.- importar ACTIONS a usar
import { filterBySearch, filterByContinente, resetAllCountries, accionAlfabetica, nextPage, orderByPopulation, filterCountriesByActivity  } from '../../redux-store/actions.js'



export default function Nav(){
	// 3.- definir el dispatch
const dispatch =useDispatch();
	// 4.- Definir selectores a usar
	// .... 
const textoAbuscar = "";

const todasLasActividades = useSelector((state) => state.activities);

	
// Handlers ----------------------------------------------------
// son los que disparan las actions
function buscarPorPais(e){
		console.log('Buscando datos '  + e.target.value );
	dispatch(filterBySearch(e.target.value));
}

function filtrarContinente(e){
	dispatch(resetAllCountries());   // reseteamos para incluir de nuevo a todos los paises
	console.log('Continente seleccionado: ' + e.target.value);
	dispatch(filterByContinente(e.target.value)); // lanzamos el filtro
}

function FiltraPorActividad(e){
	e.preventDefault()
 //	dispatch(resetAllCountries())
	console.log('Filtrando por  actividad ' + e.target.value);
	dispatch(filterCountriesByActivity(e.target.value));
}



function ordenaAlfabeticamente(e){
	console.log('Ordenando Alfabeticamente por : ' + e.target.value);
	dispatch(accionAlfabetica(e.target.value));
dispatch(nextPage());
// dispatch(resetAllCountries());    // reseteamos para incluir de nuevo a todos los paises
}


function ordenaPoblacion(e){
	console.log('Ordenando por poblacion')
	dispatch(orderByPopulation(e.target.value));
dispatch(nextPage());
}

// fin de handlers ---------------------------------------------
    return(
        <div className = {stylos.ulItems} id="Barra">
                <h1 className = {stylos.titulo} id="titulo">Bienvenidos</h1>

<ul className="ulItems">

	    {/* -Buscar por Pais- */}
 <li>
<input className={stylos.Filtros} name="SearchCountry"  placeholder="Buscar por Nombre" onChange={(e) => buscarPorPais(e) }/>
</li>

	    {/* Buscar por continentes */}
<li>
	<select name="FilterByContinent" className={stylos.Filtros} onChange={(e) => filtrarContinente(e)}>
          <option value="todos">Continentes</option>

          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>


        </select>
</li>


	{/* Filtrar por actividad */}
<li>
	<select name="FilterByActivity" className={stylos.Filtros} onChange={(e) => FiltraPorActividad(e)} >
	   <option hidden value="default">Filtrar por Actividades</option> 

{todasLasActividades.map((idx) => (<option key={idx.id} value={idx.name}>{idx.name}</option>))}
	</select>
</li>

	{/* Ordenar Alfabeticamente */}
<li> 
	<select name="OrderByAlph" className={stylos.Filtros}  onChange={(e) => ordenaAlfabeticamente(e)}>
                    <option value="">Ordenar Alfabéticamente</option>
                    <option value="az">Alfabético A-Z</option>
                    <option value="za">Alfabético Z-A</option>
         </select>
</li>

	{/* Ordenar por poblacion */}
<li>
	<select name="OrderByPopulation" className={stylos.Filtros} onChange={(e) => ordenaPoblacion(e)}>
                    <option value="">Ordenar por Poblacion</option>
                    <option value="Mayor">Mayor población</option>
                    <option value="Menor">Menor población</option>
                </select>
</li>

	    {/* Agregar Actividad */}
<li>
	<Link to='/formulario'>    
	<button className={stylos.button}>Agregar Actividad</button>    
	</Link>
</li>


</ul>


        </div>
    );
};
