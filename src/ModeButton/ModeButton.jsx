import React from 'react';
import { ThemeContextConsumer} from '../themeContext'

export const ModeButton = () => (
    <ThemeContextConsumer>
        {   
            value =>
            <div role="button" className={`${value.theme} mode-button`}
                               onClick={value.toggleTheme}>

            </div>
        }
    </ThemeContextConsumer>
)