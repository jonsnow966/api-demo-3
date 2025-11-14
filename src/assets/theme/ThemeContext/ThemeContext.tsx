import { createContext } from "react"

export const ThemeContext = createContext<{
    dark: boolean;
    setDark : (value : boolean) => void
} | null>(null);