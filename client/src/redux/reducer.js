import { ALL_DOGS, FILTER, FILTER_ORIGIN, ALL_TEMPERAMENTS, ORDER, SEARCH_DOGS, RESET, SET_PAGE } from "./action_types";

const initialState = {
    someDogs: [],
    allDogs: [],
    temperaments: [],
    order: '',
    filter: '',
    error: '',
    currentPage: ''
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case RESET:
            // Recursion a reducer para establecer el orden "breedAsc"
            const newState = reducer(state, { type: ORDER, payload: 'breedAsc' }); 
            return {
                ...newState,
                someDogs: newState.allDogs,
                filter: '',
                currentPage: 1,
            };
        case ALL_DOGS:
            //si de las actions llega un error el payload es string
            if(typeof action.payload === 'string') return{
                ...state,
                error: action.payload
            }
            return{
                ...state,
                someDogs: action.payload,
                allDogs: action.payload,
                error: '',
            };
        case SEARCH_DOGS:
            //si de las actions llega un string es porque hubo un error
            //seteo el payload en el valor de error y hago que no se muestre ningun perro
            if(typeof action.payload === 'string') return{
                ...state,
                someDogs: [],
                allDogs: state.allDogs,
                error: action.payload
            }
            return{
                ...state,
                someDogs: action.payload,
                allDogs: state.allDogs,
                error: '',
            }
        case ALL_TEMPERAMENTS:
            return{
                ...state,
                temperaments: action.payload,
                error: '',
            };
        case FILTER:
            //TEMPERAMENTS
            if(action.payload === 'All') return {
                ...state,
                someDogs: state.allDogs,
                allDogs: state.allDogs
            }
            //depende del temperamento filtro
            const filterTemperament = state.allDogs.filter(dog => dog.temperament?.includes(action.payload))
            return{
                ...state,
                filter: filterTemperament,
                someDogs: filterTemperament,
                allDogs: state.allDogs
            }
        case FILTER_ORIGIN:
            if (action.payload === 'All'){
                let combinedFilter =[];
                if (typeof state.filter === 'object') {
                    //hay un valor en el estado global filter
                    combinedFilter = state.filter.filter(dog => dog.id )
                    return{
                        ...state,
                        someDogs: combinedFilter.length ? combinedFilter : state.allDogs,
                        allDogs: state.allDogs,
                    }
                }
                return{
                    ...state,
                    someDogs: combinedFilter.length ? combinedFilter : state.allDogs,
                    allDogs: state.allDogs,
                    filter: state.someDogs
                }
            }
            if (action.payload === 'api'){
                let combinedFilter = [];
                if(typeof state.filter === 'object'){
                    //si es objeto es porque ya hay un filtro aplicado
                    combinedFilter = state.filter.filter(dog => typeof dog.id === 'number')
                }
                const filterApi = state.allDogs.filter(dog => typeof dog.id === 'number' );
                return {
                    ...state,
                    someDogs: combinedFilter.length ? combinedFilter : filterApi,
                    allDogs: state.allDogs,
                    filter: combinedFilter.length ? state.filter : ''
                }
            }
            if (action.payload === 'created'){
                const filterForm = state.allDogs.filter(dog => typeof dog.id !== 'number' );
                if(typeof state.filter === 'object'){
                    //si es obj hay filtro combinado
                    let combinedFilter = []
                    combinedFilter = state.filter.filter(dog => typeof dog.id !== 'number' )
                    return {
                        ...state,
                        //si no hay filtro combinado devuelve array vacio para que no falle el slice
                        someDogs: combinedFilter.length ? combinedFilter : [],
                        allDogs: state.allDogs,
                        filter: combinedFilter.length ? state.filter : '',
                        error: !combinedFilter.length ? 'There are no dogs with the selected temperament and origin' : ''
                    }
                }
                return {
                    ...state,
                    someDogs: filterForm,
                    allDogs: state.allDogs,
                }
            }
            break;
        case ORDER:
            if(action.payload === 'breedDesc'){
                //alfabeticamente descendiente
                state.someDogs?.sort((a,b)=>{
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                      }
                      if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1;
                      }
                      return 0;
                })
                return{
                    ...state,
                    someDogs: state.someDogs,
                    allDogs: state.allDogs,
                    order: 'breedDesc'
                }
            }
            if(action.payload === 'breedAsc'){
                //alfabeticamente ascendente
                const breedAsc = state.someDogs?.sort((a,b)=>{
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                      }
                      if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                      }
                      return 0;
                })
                return{
                    ...state,
                    someDogs: breedAsc,
                    allDogs: state.allDogs,
                    order: 'breedAsc'
                }
            }
            if(action.payload === 'weightAsc'){
                //ascendente por peso
                const weightAsc = state.someDogs?.sort((a,b)=>{
                    if (Number(a.weight.split('-')[0]) < Number(b.weight.split('-')[0])) {
                        return -1;
                      }
                      if (Number(a.weight.split('-')[0]) > Number(b.weight.split('-')[0])) {
                        return 1;
                      }
                      return 0;
                })
                return{
                    ...state,
                    someDogs: weightAsc,
                    allDogs: state.allDogs,
                    order: 'weightAsc'
                }
            }
            if(action.payload === 'weightDesc'){
                //descendiente por peso
                const weightDesc = state.someDogs?.sort((a,b)=>{
                    if (Number(a.weight.split('-')[0]) > Number(b.weight.split('-')[0])) {
                        return -1;
                      }
                      if (Number(a.weight.split('-')[0]) < Number(b.weight.split('-')[0])) {
                        return 1;
                      }
                      return 0;
                })
                return{
                    ...state,
                    someDogs: weightDesc,
                    allDogs: state.allDogs,
                    order: 'weightDesc'
                }
            }
            break;
            case SET_PAGE:
                return{
                    ...state,
                    currentPage: action.payload
                }
            
        default:
            return{
                ...state,
            }
    }
}
export default reducer;