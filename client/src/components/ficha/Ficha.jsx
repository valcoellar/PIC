import React from 'react';
import {Link} from 'react-router-dom';
import stylos from './Ficha.module.css'


import { useDispatch } from "react-redux";
import { getDetailCountry } from '../../redux-store/actions.js'


import { infoComponente } from '../ficha/Ficha.jsx'

export default function Ficha({ id, name, flag, continents  }){
const dispatch =useDispatch();


// Handlers    
function mostrarInfo(){
	dispatch(getDetailCountry(id));
	console.log('MOSTRANDO INFO DE :  '+ id);
// dipatch getDetailCountry(id)
// lanzar Info.jsx  en el stado esta como state.detailCountry{}

}

return(
        <div className = {stylos.ficha} >
           <div>
	
<Link to="/info">
<div className={stylos.placeholder} onClick={mostrarInfo } >


<h1> { name }</h1>

<h2> { continents } </h2>

<img  alt="bandera nacional" src={ flag } />





</div>
</Link>
	</div>     





        </div>
    );
};
