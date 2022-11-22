import React from 'react';
import {Link} from 'react-router-dom';
import stylos from './Tarjetas.module.css'

import Ficha from '../ficha/Ficha.jsx'

export default function tarjetas({ Todos_Los_Paises }){
    return(
        <div className = {stylos.ulItems}>


<div className={stylos.placeholder}>

	    {/*Agregamos los componentes */}

	    {Todos_Los_Paises.map((idx) => {
		return (
		<Ficha
		key={idx.id}
		name={idx.name}
		flag={idx.flag}
		continents={idx.continents}
			id={idx.id}
		/>
		);
		    
	    })}




</div>






        </div>
    );
};
