import 'core-js';
import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import { fireEvent } from "@testing-library/react";
import { Lesson } from "../components/Lesson/Lesson";
import React from "react";
import { renderWithWrappers } from "../test-utils";

const lessonHistory = {
  path: "/lesson/:id",
  route:"/lesson/0",
  history: createMemoryHistory({ initialEntries: ["/lesson/0"] })
};

xit("runs tests", () => {
  const {getByRole, getByText} = renderWithWrappers(<Lesson />, lessonHistory);
  const form = getByRole("form");
  
  expect(getByText("Translate this sentence")).toBeDefined();
  expect(getByText("Check")).toHaveProperty("disabled");
  fireEvent.change(form, { target: { value: "Hi" } });
  expect(form.value).toBe("Hi");
  fireEvent.click(getByText("Pay the Price"));
  expect(getByText("First Lesson")).toBeDefined();
});
