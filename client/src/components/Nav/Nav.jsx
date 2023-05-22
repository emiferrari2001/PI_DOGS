import Filters from "../Filters/Filters";
import { SearchBar } from "../Search Bar/SearchBar";
import { NavLink } from "react-router-dom";

import styles from './Nav.module.css'
const Nav = ()=>{
    return(
        <div className={styles.sideBarHome}>
            <SearchBar/>
            <Filters/>
            <button className={styles.createButton}><NavLink to='/create'>Create Dog</NavLink> </button>
        </div>
    )
}

export default Nav;