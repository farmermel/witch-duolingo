import React, {useState} from "react";

const ThemeContext = React.createContext({theme: "dark", toggle: () => {}});

const ThemeContextProvider = ({children}) => {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };
    
  return <ThemeContext.Provider value={{theme: theme, toggle: toggleTheme}}>
    {children}
  </ThemeContext.Provider>;
};

export {ThemeContextProvider, ThemeContext};