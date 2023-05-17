import Filters from "../Filters/Filters";
import { SearchBar } from "../Search Bar/SearchBar";
import { NavLink } from "react-router-dom";

const Nav = ()=>{
    return(
        <div>
            <h2>Nav</h2>
            <button><NavLink to='/create'>Create Dog</NavLink> </button>
            <SearchBar/>
            <Filters/>
        </div>
    )
}

export default Nav;