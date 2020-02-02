import { createMemoryHistory } from "history";
import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { ThemeContext } from "../themeContext";

export function renderWithWrappers(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  // eslint-disable-next-line
  const Wrapper = ({ children }) => (
    <ThemeContext.Provider value={{theme: "dark"}}>
      <Router history={history}>
        {children}
      </Router>
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
