import React from "react";
import { NavLink } from "react-router-dom";
import styles from './PopUp.module.css'

function PopUp(props) {
    return (props.trigger) ? (
        <div className={styles.puContainer}>
            <div className={styles.puInner}>
                <button className={styles.closeButton} onClick={()=> props.setTrigger(false)}>Close</button>
                <button><NavLink to='/home'>Return to Home</NavLink></button>
                {props.children}
            </div>
        </div>
    ) : '';
}

export default PopUp