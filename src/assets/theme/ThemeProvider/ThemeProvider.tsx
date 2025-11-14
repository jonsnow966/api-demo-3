import type { ReactNode } from "react";
import { useState } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";

export function ThemeProvider({children} : {children : ReactNode}){
    const [dark, setDark] = useState(false);
    return(
        <ThemeContext.Provider value={{dark, setDark}}>
            {children}
        </ThemeContext.Provider>
    );
} 