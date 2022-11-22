import React from 'react';
import {Link} from 'react-router-dom';
import stylos from './Home.module.css'


// importamos los componentes 
import Navegacion from '../nav/Nav.jsx'
import Paginado from '../paginado/Paginado.jsx'
import Tarjetas from '../tarjetas/Tarjetas.jsx'
// *************************



// 1- importar los use
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//-----------------------------------

// 2- importar ACTIONS
import { getCountries, getActivities } from '../../redux-store/actions.js' 

// --------------------


export default function Home(){
	// 3.- useDispatch
const dispatch = useDispatch();
	// 4.- useSelectors
const allCountries = useSelector((state) => state.countries);
const pager = useSelector((state) => state.pagina); //	<<--Estado inicial 9
const paginaActual = useSelector((state) => state.paginaActual);


const indexOfFirst = useSelector((state) => state.startIdx);
const indexOfLast = useSelector((state) => state.endIdx);	

	// 5. useEffect

useEffect(() => {
    dispatch(getCountries()); 
    dispatch(getActivities());
}, [dispatch]) //<<-- realizar una sola vez 


// Valores para pagina inicial, deben ser 9
	// primera solucion , crear un slice de allCountries con 9 elementos solamente
	// y pasarlos a Tarjetas para su render.
//const paisesElegidos = allCountries.slice(0,9)

	//Segunda solucion, asignar una variable que guardaremos en store
	// que modificara el slice +1 o -1 dependiendo de si es siguiente o anterior
	// creamos un ddefault state de pagina = 9  y una accion "SIGUIETE_PAGINA"
	// la cual en el reducer le aumentara 1 
	// luego seleccionaremos para renderizar si pager es > 9 entonces muestra 10
	// si es <= a 9 muestra 9 cards
// en slice (indexOfFirst,indexOfLast)  
	//const paisesElegidos = allCountries.slice(0,pager )

const paisesElegidos = allCountries.slice(indexOfFirst,indexOfLast)

    return(

        <div className = {stylos.Body} id="Body">
	  <Navegacion/>
	<Paginado pager={ pager }/>
	<Tarjetas Todos_Los_Paises ={ paisesElegidos  }/>

	    <h1 className = {stylos.titulo} id="titulo">Henry Countries</h1>

        </div>
    );
};
