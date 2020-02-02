import React, { useContext } from 'react';
import { ThemeContext } from "../themeContext";

export const ModeButton = () => {
  const value = useContext(ThemeContext);

  return (
    <div role="button" 
      className={`${value.theme} mode-button`
        //aria ignore???
      }
      onClick={value.toggleTheme}>

    </div>
  ); 
};