import { ALL_DOGS, FILTER, ORDER, RESET } from "./action_types";
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

export const filterDogs = (filter) =>{
    return{
        type: FILTER,
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