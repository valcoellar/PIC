import React from 'react';
import {Link} from 'react-router-dom';
import stylos from './Landing.module.css'

export default function landing(){
    return(
        <div className = {stylos.Body} id="Body">
            <div className = {stylos.Contenedor} id="Contenedor">
                <h1 className = {stylos.titulo} id="titulo">Paises</h1>
                    <div >
                    <Link to = '/home'>
                        <button className={stylos.Boton} >Iniciar</button>    
                    </Link>
                    </div>
                <div className = {stylos.author} id="author">
                <h3 className = {stylos.textoAuthor} id="textoAuthor">Valentin Coellar S. 31c</h3>
                </div>
            </div>
        </div>
    );
};
