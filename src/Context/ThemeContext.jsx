import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext();

export default function ThemeContextProvider({children}) {
    const [darkTheme, setDarkTheme] = useState(true);
    const toggleDarkTheme = () => {
        setDarkTheme(theme => !theme)
    }

    useEffect(() => {
        const checkStorage = (e) => {
            const { key, newValue } = e;

            if (key === "msDarkTheme") {
                setDarkTheme(newValue)
            }
        }

        window.addEventListener("storage", checkStorage)
        return (() => window.removeEventListener("storage", checkStorage))
    })

    useEffect(() => {
        localStorage.setItem("msDarkTheme", JSON.stringify(darkTheme));
      }, [darkTheme])

    return (
        <>
            <div className={`themeWrapper ${darkTheme?"":"lightBackground"}`}>
                <ThemeContext.Provider value={{darkTheme, toggleDarkTheme}}>
                    {children}
                </ThemeContext.Provider>
            </div>
        </>
    )
}
