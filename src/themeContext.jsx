import React, { useState } from "react";
const { Provider, Consumer } = React.createContext();

const ThemeContextProvider = ({children}) => {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        let newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
    }

    return (
        <Provider value={{theme, toggleTheme}}>
            {children}
        </Provider>
    )
}

// class ThemeContextProvider extends Component {
//   state = {
//     theme: "Day"
//   };

//   toggleTheme = () => {
//     this.setState(prevState => {
//       return {
//         theme: prevState.theme === "Day" ? "Night" : "Day"
//       };
//     });
//   };

//   render() {
//     return (
//       <Provider
//         value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
//       >
//         {this.props.children}
//       </Provider>
//     );
//   }
// }

export { ThemeContextProvider, Consumer as ThemeContextConsumer };
