import React from 'react';
import {Link} from 'react-router-dom';
import stylos from './Paginado.module.css'

//import { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { nextPage, masUno, antPage, menosUno } from '../../redux-store/actions.js'


export default function Paginado({ pager }){
const dispatch = useDispatch();

// Handlers
function siguientePagina(e){
	e.preventDefault();
	dispatch(nextPage());
	dispatch(masUno());
}

function anteriorPagina(e){
	e.preventDefault();
	dispatch(antPage());
	dispatch(menosUno());
}




    return(
        <div className = {stylos.ulItems} id="Barra">
           <div>

	<button className={stylos.Boton} onClick={(e) => anteriorPagina(e)}>Anterior</button>
	<button className={stylos.Boton} onClick={(e) => siguientePagina(e)}>Siguiente</button>


                </div>     





        </div>
    );
};
