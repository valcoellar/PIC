import React from 'react';
import { Link } from 'react-router-dom';
import stylos from './Info.module.css'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Info() {
const detallePais = useSelector((state) => state.detailCountry);
// const actividades = useSelector((state) => state.activities);
// detallePais.actividads es donde se encuentran las actividades 


	return (
       <div>
           <div>
            <div className={stylos.Placeholder}>
                    <img  className={stylos.Bandera} alt="bandera nacional" src={detallePais.flag}/>
                <div className={stylos.datos}>    
		<h1>Nombre: {detallePais.name}</h1>
                    <h1>ID: {detallePais.id}</h1>
                    <h1>Se encuentra en el continente: {detallePais.continents}</h1>
                    <h1>Su capital es: {detallePais.capital} </h1>
                    <h1>Subregion: {detallePais.subregion}</h1>
                    <h1>Area: {new Intl.NumberFormat("es-MX").format(detallePais.area)} km2.{" "}</h1>	
                    <h1>Poblacion: {new Intl.NumberFormat("es-MX").format(detallePais.population)}{" "}</h1>
                </div>   
		<hr></hr>
                    <hr></hr>
                    <h1 className={stylos.actividades}>Actividades:</h1>
	

	<h1 className={stylos.actividades}> {detallePais.actividads ? detallePais.actividads.map((idx) =>  idx.name ) : null} </h1>
			
	<h1 className={stylos.actividades}>Se realiza en:  {detallePais.actividads ? detallePais.actividads.map((idx) =>  idx.season ) : null} </h1>
	
	<h1 className={stylos.actividades}>Tiene una dificultad nivel :  {detallePais.actividads ? detallePais.actividads.map((idx) =>  idx.difficulty ) : null} </h1>
	

	<h1 className={stylos.actividades}>Recomendado realizarla durante :  {detallePais.actividads ? detallePais.actividads.map((idx) =>  idx.duration ) : null}  horas</h1>

		<Link to="/home">
                    <button className={stylos.Cerrar}>Cerrar</button>
                    </Link>
                    </div>
                    </div>
                    </div>
                    );
                };
