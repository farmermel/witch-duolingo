import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen, waitForDomChange, waitForElement } from '@testing-library/react';
import { MatchingCard } from '../components/Card/MatchingCard';
import React from 'react';
import { renderWithWrappers } from '../test-utils';
//for flat method
import 'core-js';

const fakeTranslationAnswers = {
  Hello: "Salve", 
  Goodbye: "Vale", 
  nonsense: "nonsense", 
  fake: "fake", 
  five: "five"
};

let getAllByRole, getByText;

beforeEach(async () => {
  ({ getAllByRole, getByText } = renderWithWrappers(<MatchingCard translationAnswers={fakeTranslationAnswers}
    setCurrentCard={() => {}} 
  />));

  await waitForElement(
    () => getAllByRole("textbox")
  );
});

test("first word selected changes clicked word to selected state", () => {
  expect(getAllByRole("textbox")[0]).toHaveValue("Hello");
  fireEvent.click(getByText("Hello"));
  expect(getAllByRole("textbox")[0]).toHaveClass("selected");
});

test("second and correct word selected changes both clicked words to correct state then fades to disabled", async () => {
  expect(getAllByRole("textbox")[0]).toHaveValue("Hello");
  
  fireEvent.click(getByText("Hello"));
  fireEvent.click(getByText("Salve"));

  expect(getAllByRole("textbox")[0]).toHaveClass("correct");
  expect(getAllByRole("textbox")[1]).toHaveClass("correct");

  await waitForDomChange();

  expect(getAllByRole("textbox")[0]).toHaveClass("disabled");
  expect(getAllByRole("textbox")[1]).toHaveClass("disabled");
});

test("disabled words cannot be clicked again", async () => {
  expect(getAllByRole("textbox")[0]).toHaveValue("Hello");
  
  fireEvent.click(getByText("Hello"));
  fireEvent.click(getByText("Salve"));

  expect(getAllByRole("textbox")[0]).toHaveClass("correct");
  expect(getAllByRole("textbox")[1]).toHaveClass("correct");

  await waitForDomChange();

  expect(getAllByRole("textbox")[0]).toHaveClass("disabled");
  expect(getAllByRole("textbox")[1]).toHaveClass("disabled");

  fireEvent.click(getByText("Hello"));
  expect(getAllByRole("textbox")[0]).toHaveClass("disabled");
});

test("second and incorrect word selected changes both clicked words to incorrect state then fades to untouched", async () => {
  expect(getAllByRole("textbox")[0]).toHaveValue("Hello");
  
  fireEvent.click(getByText("Hello"));
  fireEvent.click(getByText("Goodbye"));

  expect(getAllByRole("textbox")[0]).toHaveClass("incorrect");
  expect(getAllByRole("textbox")[2]).toHaveClass("incorrect");

  await waitForDomChange();

  expect(getAllByRole("textbox")[0]).toHaveClass("untouched");
  expect(getAllByRole("textbox")[2]).toHaveClass("untouched");
});