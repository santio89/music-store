import React, { useContext } from "react"
import '../../src/styles/css/ThemeButton.css';
import { ThemeContext } from "../Context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";


/* const buttonRipple = (e) => {
    let x = e.clientX - e.target.getBoundingClientRect().x;
    let y = e.clientY - e.target.getBoundingClientRect().y;
    let ripples = document.createElement("span");
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    e.target.appendChild(ripples);

    setTimeout(() => {
        ripples.remove();
    }, 1000);
} */

export default function ThemeButton({navClosed}) {
    const { toggleDarkTheme, darkTheme } = useContext(ThemeContext);

    return (
        /*   <button onClick={buttonRipple} className="button is-dark is-size-5-widescreen is-size-6-desktop is-size-5-touch button__logIn">
              Ingresar
          </button> */
        
            <button className="themeButton" onClick={()=>{toggleDarkTheme(); navClosed()}}>
                <AnimatePresence exitBeforeEnter>
                {darkTheme?
                    <motion.i key="themeButtonSun" className="bi bi-sun-fill" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transform: "rotate(180deg)"}} transition={{duration: .2}}></motion.i>:
                    <motion.i key="themeButtonMoon" className="bi bi-moon-fill" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, transform: "rotate(180deg)"}} transition={{duration: .2}}></motion.i>
                }
                </AnimatePresence>
            </button>
        
    )
}