import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen } from "@testing-library/react";
import { Lesson } from "../Lesson/Lesson";
import React from "react";
import { renderWithWrappers } from "./test-utils.js";

test("runs tests", () => {
  const {getByRole} = renderWithWrappers(<Lesson />);
  const input = getByRole("input");
  
  expect(screen.queryByText("Translate this sentence")).toBeDefined();
  expect(screen.getByText("Check").toHaveProperty("disabled"));
  fireEvent.change(input, { target: { value: "Hi" } });
  expect(input.value).toBe("Hi");
//   fireEvent.click(screen.getByText("Pay the Price"));
//   expect(screen.queryByText("First Lesson")).toBeDefined();
});
