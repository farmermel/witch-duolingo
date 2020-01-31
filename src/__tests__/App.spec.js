import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen } from "@testing-library/react";
import { App } from "../App/App";
import React from "react";
import { renderWithWrappers } from "./test-utils.js";

test('runs tests', () => {
  renderWithWrappers(<App />);
  expect(screen.queryByText("money")).toBeDefined();
  fireEvent.click(screen.getByText("Pay the Price"));
  expect(screen.queryByText("First Lesson")).toBeDefined();
});
