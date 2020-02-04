import "../styles/index.css";
import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { LandingPage } from "../LandingPage/LandingPage";
import { Lesson } from "../Lesson/Lesson";
import { ThemeContext } from "../contexts/themeContext";
import { UserHome } from "../UserHome/UserHome";

export const App = () => {
  const value = useContext(ThemeContext);
  
  return (
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
  ); 
};

export default App;
