import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./components/App/App"
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import lessons from "./lessons";
import { LessonsContext } from "./contexts/lessonsContext"
import { ThemeContext } from "./contexts/themeContext";

//put in toggle
  ReactDOM.render(
    <Router>
      <ThemeContext.Provider value={{theme: "dark", toggle: () => {}}}>
        <LessonsContext.Provider value={lessons}>
          <App />
        </LessonsContext.Provider>
      </ThemeContext.Provider>
    </Router>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


