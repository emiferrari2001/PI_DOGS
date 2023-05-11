import { NavLink } from "react-router-dom";
const Landing = () =>{
    return(
        <div>
            <h1>Dogs</h1>
            <button><NavLink to='/home'>Home</NavLink></button>
        </div>
    )
}

export default Landing;