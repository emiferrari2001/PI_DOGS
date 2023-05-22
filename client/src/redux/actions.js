import { ALL_DOGS, ALL_TEMPERAMENTS, FILTER, FILTER_ORIGIN, ORDER, RESET, SEARCH_DOGS, SET_PAGE } from "./action_types";
import axios from 'axios';

export const allDogs = ()=>{
    const endpoint = 'http://localhost:3001/dogs';
    return async (dispatch) => {
        try {
            const {data} = await axios.get(endpoint);
            dispatch({
                type: ALL_DOGS,
                payload: data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const searchDogs = (name)=>{
    const endpoint = `http://localhost:3001/dogs?name=${name}`;
    return async (dispatch) => {
        try {
            const {data} = await axios.get(endpoint);
            dispatch({
                type: SEARCH_DOGS,
                payload: data
            })
        } catch (error) {
            console.log(error.message)
            dispatch({
                type: SEARCH_DOGS,
                payload: `There are no dogs that match with the value "${name}"`
            })
        }
    }
}

export const allTemperaments=()=>{
    const endpoint = 'http://localhost:3001/temperament';
    return async (dispatch) => {
        try {
           const {data} = await axios.get(endpoint);
           dispatch({
            type: ALL_TEMPERAMENTS,
            payload: data
           }) 
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const filterDogs = (filter) =>{
    return{
        type: FILTER,
        payload: filter
    }
}

export const filterOrigin = (filter) =>{
    return{
        type: FILTER_ORIGIN,
        payload: filter
    }
}

export const orderDogs = (order) =>{
    return{
        type: ORDER,
        payload: order
    }
}

export const resetDogs = ()=>{
    return{
        type: RESET,
    }
}

export const setPageNumber = (number)=>{
    return{
        type: SET_PAGE,
        payload: number
    }
}