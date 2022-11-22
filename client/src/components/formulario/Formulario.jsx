import React from 'react';
import { Link } from 'react-router-dom';
import style from './Formulario.module.css'


// 1- importar los use
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//-----------------------------------

// 2- importar ACTIONS
import { postActivity, resetAllCountries } from '../../redux-store/actions.js'
// --------------------

export default function Formulario() {
	// 3.- useDispatch
const dispatch = useDispatch();
	//4.- useSelectors
const allCountries = useSelector((state) => state.countries);
let paisesSeleccionados = [];


// uso de estado
const [formularioCapturado,setForm]=useState({
	name: "",
	difficulty: 0,
	duration: "",
	season: "",
	country: "",
})



//Handlers---------------------
function agregaPais(e){
	e.preventDefault()
paisesSeleccionados.push(e.target.value);	
	console.log(paisesSeleccionados);
alert('Paises Agregados: ' + paisesSeleccionados);   // *****


	setForm({
 	...formularioCapturado,
 	[e.target.name]: String(paisesSeleccionados), 
 	})

}

function returnHome(){
	dispatch(resetAllCountries());

}



//*** validaciones de fields ***
function validaName(e){
  if (e.target.value === "") {
    alert("El nombre no debe estar vacio");
  }
if(/^[A-Za-z\s]+$/.test(e.target.value))
	return true;
	else
	alert('Nombre no debe contener caracteres que no sean letras/numeros/espacios')

}

function validaDifficulty(e){
 if(!/^[1-5]+$/.test(e.target.value)){
	alert('Dificultad debe ser en rango del 1 al 5')
 }
 }

function validaDuration(e){

 if(!/^[1-24]+$/.test(e.target.value)){
	alert('La duracion debe ser de 1 a 24 horas')
}
}


//******************************



function manejaSubmit(e){
	e.preventDefault()
// alert('manejaSubmit: '+paisesSeleccionados)
// subimos al estado form los datos del formulario

	setForm({
 	...formularioCapturado,
 	[e.target.name]: e.target.value,
//	paises: paisesSeleccionados,
 	});


// ya subiendo el state.formularioCapturado 
// podemos enviarlo a post accion->reducer->axios post
// con dispatch

// +++ postActividad(form) 
// postActivity
// localhost:3001/activity  get y post 
// dispatch(postActivity(formularioCapturado));

//alert("Se agrego actividad " + formularioCapturado.name);	
//alert("No puede haber ningun campo vacio");	

// 	alert(e.target.difficulty.value)
// 	alert(e.target.duration.value)


}

function enviaPost(e){
	e.preventDefault()
dispatch(postActivity(formularioCapturado));
alert("Se agrego actividad " + formularioCapturado.name);	


}

// ----------------------------



return (  
    <form name="fomulario" method="POST" onSubmit={(e) => enviaPost(e)}>
      <div className={style.Placeholder}>
        <div className={style.Formulario}>
         <div className={style.datos}> 
       

	  <label className={style.titulos} >Actividad </label>
          <input className={style.campos} name="name" id="name" type="text" onChange={(e) => manejaSubmit(e)} onBlur={(e) => validaName(e) }/>


	    <label className={style.titulos}>Dificultad del 1 al 5 </label>
          <input className={style.campos} name="difficulty" type="number" id="number" min="1" max="5" onChange={(e) => manejaSubmit(e)} onBlur={(e) => validaDifficulty(e)}/>
          
          <label className={style.titulos}>Duracion en horas: </label>
          <input className={style.campos} name="duration" type="number" id="number" min="1" max="24" onChange={(e) => manejaSubmit(e)}  onBlur={(e) => validaDuration(e)} />
          <label className={style.titulos}>Temporada </label>

<div className={style.temporadas}>
	    <label>
            <input type="radio" name="season" value="primavera" onChange={(e) => manejaSubmit(e)}/>Primavera</label>
            <label>
                <input type="radio" name="season" value="verano" onChange={(e) => manejaSubmit(e)}/>Verano</label>
                <label>
                    <input type="radio" name="season" value="otono" onChange={(e) => manejaSubmit(e)}/>Otoño</label>
                    <label>
                    <input type="radio" name="season" value="invierno" onChange={(e) => manejaSubmit(e)}/>Invierno</label>
</div>
         <div className={style.paisesSel}>       

	<label>Selecionar Paises </label>
	{/* https://contactmentor.com/react-dropdown-search-multi-select/  */}

<select className={style.paisesSelCampo} name="country" onChange={(e) => agregaPais(e) }>
	{allCountries.map((idx) => (<option key={idx.id} value={idx.id}>{idx.name}</option>))} 
</select>

	</div>

	    </div>  
	    <div className={style.botones}>
                    <Link to="/home">
                    <button className={style.Boton} onClick={(e) => returnHome()}>Cerrar</button>
                    </Link>
<button type="submit" className={style.Boton}>Guardar</button>
			

                    </div>
	   </div> 
                    </div>
                    </form>
                );
              }
