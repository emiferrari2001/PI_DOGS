import { ALL_DOGS, FILTER, ORDER, RESET } from "./action_types";

const initialState = {
    someDogs: [],
    allDogs: []
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case ALL_DOGS:
            return{
                ...state,
                someDogs: action.payload,
                allDogs: action.payload
            };
        case FILTER:
            //depende del temperamento filtro
            const filterTemperament = state.allDogs.filter(dog => dog.temperament.includes(action.payload))
            return{
                ...state,
                someDogs: filterTemperament,
                allDogs: state.allDogs
            }
        default:
            return{
                ...state,
            }
    }
}
export default reducer;