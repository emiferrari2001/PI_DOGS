import Filters from "../Filters/Filters";
import { SearchBar } from "../Search Bar/SearchBar";
const Nav = ()=>{
    return(
        <div>
            <h2>Nav</h2>
            <SearchBar/>
            <Filters/>
        </div>
    )
}

export default Nav;