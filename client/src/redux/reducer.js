import { ALL_DOGS, FILTER, FILTER_ORIGIN, ALL_TEMPERAMENTS, ORDER, SEARCH_DOGS, RESET, SET_PAGE } from "./action_types";

const initialState = {
    someDogs: [],
    allDogs: [],
    temperaments: [],
    order: '',
    filter: '',
    error: '',
    currentPage: 1
}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case RESET:
            console.log('reset');
            // Recursion a reduced para establecer el orden "breedAsc"
            const newState = reducer(state, { type: ORDER, payload: 'breedAsc' }); 
            return {
                ...newState,
                someDogs: newState.allDogs,
                filter: ''
            };
        case ALL_DOGS:
            return{
                ...state,
                someDogs: action.payload,
                allDogs: action.payload,
            };
        case SEARCH_DOGS:
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
            console.log('filter temperamentos', action.payload)
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
            console.log('filter origin')
            if (action.payload === 'All'){
                let combinedFilter =[];
                
                console.log(state.filter)
                if (typeof state.filter === 'object') {
                    //hay un valor en el estado global filter
                    combinedFilter = state.filter.filter(dog => dog.id )
                    console.log(combinedFilter)
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
                console.log('typeof state.filter ',typeof state.filter)
                let combinedFilter = [];
                if(typeof state.filter === 'object'){
                    console.log('combinedFilter')
                    console.log(state.filter)
                    combinedFilter = state.filter.filter(dog => typeof dog.id == 'number')
                    console.log(combinedFilter)
                }
                const filterApi = state.allDogs.filter(dog => typeof dog.id === 'number' );
                return {
                    ...state,
                    someDogs: combinedFilter.length ? combinedFilter : filterApi,
                    allDogs: state.allDogs,
                    filter: combinedFilter.length ? state.filter : ''
                    //filter: 'api'
                }
            }
            if (action.payload === 'created'){
                const filterForm = state.allDogs.filter(dog => typeof dog.id !== 'number' );
                if(typeof state.filter === 'object'){
                    let combinedFilter = []
                    console.log('combinedFilter')
                    combinedFilter = state.filter.filter(dog => typeof dog.id !== 'number' )
                    console.log(combinedFilter)
                    console.log(state.filter)
                    return {
                        ...state,
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
                    if (Number(a.weight.split('-')[0]) < Number(b.weight.split('-')[0])) {
                        return -1;
                      }
                      if (Number(a.weight.split('-')[0]) > Number(b.weight.split('-')[0])) {
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
            if(action.payload === 'weightDesc'){
                console.log('weightDesc')
                const weightDesc = state.someDogs?.sort((a,b)=>{
                    if (Number(a.weight.split('-')[0]) > Number(b.weight.split('-')[0])) {
                        return -1;
                      }
                      if (Number(a.weight.split('-')[0]) < Number(b.weight.split('-')[0])) {
                        return 1;
                      }
                      return 0;
                })
                console.log(weightDesc[0])
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