import "../styles/index.css";
import { Route, Switch } from "react-router-dom";
import { LandingPage } from "../LandingPage/LandingPage";
import { Lesson } from "../Lesson/Lesson";
import React from "react";
import { UserHome } from "../UserHome/UserHome";
import { ThemeContextConsumer} from "../themeContext"

export const App = () => (
<ThemeContextConsumer>
  { value => (
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
    )}
    </ThemeContextConsumer>
);

export default App;
