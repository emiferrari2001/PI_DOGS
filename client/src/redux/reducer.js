import { ALL_DOGS, FILTER, ALL_TEMPERAMENTS, ORDER } from "./action_types";

const initialState = {
    someDogs: [],
    allDogs: [],
    temperaments: [],
    order: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case ALL_DOGS:
            return{
                ...state,
                someDogs: action.payload,
                allDogs: action.payload
            };
        case ALL_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload
            };
        case FILTER:
            console.log('filter temperamentos', action.payload)
            if(action.payload === 'All') return {
                ...state,
                someDogs: state.allDogs,
                allDogs: state.allDogs
            }
            //depende del temperamento filtro
            //const log = state.allDogs.map(dog => console.log(dog))
            //console.log(log)
            const filterTemperament = state.allDogs.filter(dog => dog.temperament?.includes(action.payload))
            return{
                ...state,
                someDogs: filterTemperament,
                allDogs: state.allDogs
            }
        case ORDER:
            if(action.payload === 'breedDesc'){
                console.log('breedDesc')
                state.someDogs?.sort((a,b)=>{
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                      }
                      if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1;
                      }
                      return 0;
                })
                console.log(state.someDogs[0])
                return{
                    ...state,
                    someDogs: state.someDogs,
                    allDogs: state.allDogs,
                    order: 'breedDesc'
                }
            }
            if(action.payload === 'breedAsc'){
                console.log('breedAsc')
                const breedAsc = state.someDogs?.sort((a,b)=>{
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                      }
                      if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                      }
                      return 0;
                })
                console.log(breedAsc[0])
                return{
                    ...state,
                    someDogs: breedAsc,
                    allDogs: state.allDogs,
                    order: 'breedAsc'
                }
            }
            if(action.payload === 'weightAsc'){
                console.log('weightAsc')
                const weightAsc = state.someDogs?.sort((a,b)=>{
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                      }
                      if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                      }
                      return 0;
                })
                console.log(weightAsc[0])
                return{
                    ...state,
                    someDogs: weightAsc,
                    allDogs: state.allDogs,
                    order: 'weightAsc'
                }
            }
            break;
        default:
            return{
                ...state,
            }
    }
}
export default reducer;