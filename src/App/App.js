import "../styles/index.css";
import { Route, Switch } from "react-router-dom";
import { LandingPage } from "../LandingPage/LandingPage";
import { Lesson } from "../Lesson/Lesson";
import React, { useContext } from "react";
import { UserHome } from "../UserHome/UserHome";
// import { ThemeContext } from "../index";

export const ThemeContext = React.createContext({theme: "dark", toggle: () => {}});

export const App = () => {
  const value = useContext(ThemeContext);
  
  return (
<ThemeContext.Consumer>
    <div className={`${value.theme} App`}>
      <Switch>
        <Route path="/lesson/:id">
          <Lesson />
        </Route>
        <Route path="/user-home">
          <UserHome />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  </ThemeContext.Consumer>
)};

export default App;
