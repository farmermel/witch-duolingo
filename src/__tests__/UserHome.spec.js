import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { renderWithWrappers } from "../test-utils";
import { UserHome } from "../components/UserHome/UserHome";

test("renders main page", () => {
  const {getByRole} = renderWithWrappers(<UserHome />, {route:"/user-home"});

  expect(getByRole("main")).toBeInTheDocument();
});