import axios from 'axios';

// aqui van todas las acciones 
// sintaxis: 
// export const ACCION = "ACCION";

// que acciones se usaran:
//
// 1.-carga todos los countries 			== LOAD__COUNTRIES
// 2.-carga los datos del pais indicado por el nombre  	== LOAD_COUNTRY__BY_NAME
// 3.-carga los datos del pais indicado por id		== LOAD_COUNTRY_BY_ID
// 4.-carga actividades					== LOAD_ACTIVITIES
// 5.-guarda actividad					== SAVE_ACTIVITY
// 6.-FILTER_BY_REGION
// 7.-FILTER_BY_ACTIVITY
// 8.-ORDER_BY_NAME_
// 9.-ORDER_BY_POPULATION
// 10.-ERROR_DE_CARGA

export const GET_COUNTRIES = "GET_COUNTRIES";
export const ERROR_AL_CARGAR = "ERROR_AL_CARGAR";
export const RESET_ALL_COUNTRIES = "RESET_ALL_COUNTRIES"

export const GET_DETAIL_COUNTRY = "GET_DETAIL_COUNTRY";
export const GET_ACTIVITIES = "GET_ACTIVITIES";

export const POST_ACTIVITY = "POST_ACTIVITY";

export const FILTER_BY_REGION = "FILTER_BY_REGION";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const FILTER_BY_SEARCH = "FILTER_BY_SEARCH";
export const FILTER_BY_CONTINENTE = "FILTER_BY_CONTINENTE";


export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const ORDER_ALFABETICO = "ORDER_ALFABETICO"

export const SIGUIENTE_PAGINA = "SIGUIENTE_PAGINA";
export const ACTUAL_MENOS_UNO = "ACTUAL_MENOS_UNO";
export const ACTUAL_MAS_UNO = "ACTUAL_MAS_UNO";
export const ANTERIOR_PAGINA = "ANTERIOR_PAGINA";
// ----------------------------



// Funciones de acciones -----
export function getCountries() {
    console.log("Accionando getCountries");
    return function (dispatch) {
        return axios
        .get("http://localhost:3001/countries")
        .then ((json) => {
        dispatch({ type: GET_COUNTRIES, payload: json.data })
        })
        .catch((err) => {
            dispatch({ type: ERROR_AL_CARGAR });
        });
      };
    };

export function getNameCountries(name){
    return async function(dispatch){
        try{
            var json = await axios.get ("http://localhost:3001/countries?name="+name);
            return dispatch ({
                type: "GET_NAME_COUNTRIES",
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function getDetailCountry(id){
    return async function(dispatch){
        try{
            var json = await axios.get (`http://localhost:3001/countries/${id}`);
            return dispatch ({
                type: "GET_DETAIL_COUNTRY",
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function filterCountriesByRegion(payload){
        return {
            type: "FILTER_BY_REGION",
            payload

        } 
}

export function filterCountriesByActivity(payload){
    return {
        type: "FILTER_BY_ACTIVITY",
        payload

    } 
}

export function orderByName(payload){
    return {
        type: "ORDER_BY_NAME",
        payload

    } 
}    

export function orderByPopulation(payload){
    return {
        type: "ORDER_BY_POPULATION",
        payload
    
        }             
}

export function getActivities(){
    return async function(dispatch){
        try{
            var info = await axios.get ("http://localhost:3001/activity");
            return dispatch ({
                type: "GET_ACTIVITIES",
                payload: info.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function postActivity(payload){
            var response = axios.post("http://localhost:3001/activity/post", payload)
            console.log(response)
	    console.log('PAYLOAD: ' +payload)
            return {
                type: "POST_ACTIVITY",
                response
    }

}

export function nextPage(){
	return {
	type: "SIGUIENTE_PAGINA"

	}

}

export function masUno(){
	return{
	type: "ACTUAL_MAS_UNO"	
		}
}

export function menosUno(){
	return{
	type: "ACTUAL_MENOS_UNO"
		}

}

export function antPage(){
	return{
	type: "ANTERIOR_PAGINA"
	}
}


export function resetAllCountries(){
	return{
	type: "RESET_ALL_COUNTRIES"
	}
}


export function filterBySearch(data) {
	return {
	type: "FILTER_BY_SEARCH",
	payload: data
	}

}
export function filterByContinente(data){
	return {
	type: "FILTER_BY_CONTINENTE",
	payload: data 
	}
}

export function accionAlfabetica(data){
	return {
	type: "ORDER_ALFABETICO",
	payload: data
	}
	}




// ----------------------------

