import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchDogs } from "../../redux/actions";

export const SearchBar = ()=>{
    const dispatch = useDispatch();
    const {error, someDogs} = useSelector(state=> state)
    
    const [search, setSearch] = useState('')

    const onSearchChange = (event)=>{
        setSearch(event.target.value)
    }

    const searchDog = () => {
        dispatch(searchDogs(search));
        setSearch('')
    }

    useEffect(()=>{
        
    }, [error, someDogs])

    return(

        <div>
            <input type="search" value={search} onChange={onSearchChange} />
            <button onClick={() => searchDog()}>Search</button>
            {
                //si hay perros mostrandose y hay un mensaje de error, se muestra
                error !== '' && (someDogs.length === 0) && <p>{error}</p>
            }
        </div>
    )
}