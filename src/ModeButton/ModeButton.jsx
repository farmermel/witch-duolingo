import React, { useContext } from 'react';
import { ThemeContext } from '../App/App';

export const ModeButton = () => {
    const value = useContext(ThemeContext);

    return (
    <ThemeContext.Consumer>
            <div role="button" 
                 className={`${value.theme} mode-button`
                 //aria ignore???
                }
                               onClick={value.toggleTheme}>

            </div>
    </ThemeContext.Consumer>
)}