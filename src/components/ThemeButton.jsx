import React, { useContext } from "react"
import '../../src/styles/css/ThemeButton.css';
import { ThemeContext } from "../Context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";



export default function ThemeButton({ navClosed }) {
    const { toggleDarkTheme, darkTheme } = useContext(ThemeContext);

    return (
        <button className="ThemeButton" onClick={() => { toggleDarkTheme(); navClosed() }}>
            <AnimatePresence exitBeforeEnter>
                {darkTheme ?
                    <motion.i key="themeButtonSun" className="bi bi-sun-fill" initial={{ opacity: 0, transform: "rotate(-180deg)" }} animate={{ opacity: 1, transform: "rotate(0deg)" }} exit={{ opacity: 0, transform: "rotate(180deg)" }} transition={{ duration: .2 }}></motion.i> :
                    <motion.i key="themeButtonMoon" className="bi bi-moon-fill" initial={{ opacity: 0, transform: "rotate(-180deg)" }} animate={{ opacity: 1, transform: "rotate(0deg)" }} exit={{ opacity: 0, transform: "rotate(180deg)" }} transition={{ duration: .2 }}></motion.i>
                }
            </AnimatePresence>
        </button>

    )
}