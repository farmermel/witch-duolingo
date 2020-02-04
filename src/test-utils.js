import { createMemoryHistory } from "history";
import lessons from "./lessons";
import { LessonsContext } from "./contexts/lessonsContext";
import React from "react";
import { render } from "@testing-library/react";
import { Router, Route } from "react-router-dom";
import { ThemeContext } from "./contexts/themeContext";

export function renderWithWrappers(
  ui,
  {
    path = "/",
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  // eslint-disable-next-line
  const Wrapper = ({ children }) => (
    <ThemeContext.Provider value={{theme: "dark"}}>
      <LessonsContext.Provider value={lessons}>
        <Router history={history}>
          <Route path={path}>
            {children}
          </Route>
        </Router>
      </LessonsContext.Provider>
    </ThemeContext.Provider>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}
