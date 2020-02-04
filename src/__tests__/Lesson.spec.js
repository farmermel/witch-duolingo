import "@testing-library/jest-dom/extend-expect";
import { createMemoryHistory } from "history";
import { fireEvent, screen } from "@testing-library/react";
import { Lesson } from "../components/Lesson/Lesson";
import React from "react";
import { renderWithWrappers } from "../test-utils";
//for flat method
import 'core-js';

const lessonHistory = {
  path: "/lesson/:id",
  route:"/lesson/0",
  history: createMemoryHistory({ initialEntries: ["/lesson/0"] })
};

test("runs tests", () => {
  const {getByRole} = renderWithWrappers(<Lesson />, lessonHistory);
  const form = getByRole("form");
  
  // expect(screen.queryByText("Translate this sentence")).toBeDefined();
  // expect(screen.getByText("Check").toHaveProperty("disabled"));
  // fireEvent.change(form, { target: { value: "Hi" } });
  // expect(form.value).toBe("Hi");
//   fireEvent.click(screen.getByText("Pay the Price"));
//   expect(screen.queryByText("First Lesson")).toBeDefined();
});
