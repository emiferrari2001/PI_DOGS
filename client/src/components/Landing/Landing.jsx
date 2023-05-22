import { NavLink } from "react-router-dom";
import styles from './Landing.module.css'

const Landing = () =>{
    return(
        <div className={styles.background}>
            <div className={styles.divLeft}>
            <h1>BarkBook</h1>
            <button><NavLink to='/home'>Explore</NavLink></button>
            </div>

            <div className={styles.divRight}>
                <div>
                    <p> </p>
                </div>
            </div>
        </div>
    )
}

export default Landing;