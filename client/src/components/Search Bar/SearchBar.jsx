import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchDogs } from "../../redux/actions";

import PopUp from "../PopUp/PopUp";

import styles from './SearchBar.module.css'

export const SearchBar = ()=>{
    const dispatch = useDispatch();
    const {error, someDogs} = useSelector(state=> state)
    
    const [search, setSearch] = useState('')

    const [popUp, setPopUp] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState('')


    const onSearchChange = (event)=>{
        setSearch(event.target.value)
    }

    const searchDog = () => {
        dispatch(searchDogs(search));
        setSearch('')
        document.getElementById("temperaments-select").value = "All";
        document.getElementById("select-origin").value = "All";
    }

    useEffect(()=>{
        if(error !== ''){
            setPopUp(true)
            setPopUpMessage(error)
        }
    }, [error, someDogs])

    return(

        <div className={styles.allBar}>
            {
                //muestra mensaje de error si busqueda no devuelve ningun resultado
                <PopUp trigger={popUp} setTrigger={setPopUp}>
                <h3>{popUpMessage}</h3>
                </PopUp>
            }
            <p className={styles.title}>Search breeds</p>
            <div className={styles.searchContainer}>
                <input type="search" value={search} onChange={onSearchChange}/>
                <button onClick={() => searchDog()}>🔎︎</button>
            </div>
        </div>
    )
}