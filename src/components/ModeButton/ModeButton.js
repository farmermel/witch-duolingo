import React, { useContext } from 'react';
import { ThemeContext } from "../../contexts/themeContext";

export const ModeButton = () => {
  const theme = useContext(ThemeContext);

  return (
    <div role="button" 
      className={`${theme.theme} mode-button`
      }
      onClick={theme.toggle}>

    </div>
  ); 
};