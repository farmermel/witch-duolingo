import 'core-js';
import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent, waitForDomChange, waitForElement } from '@testing-library/react';
import { MatchingCard } from '../components/Card/MatchingCard';
import React from 'react';
import { renderWithWrappers } from '../test-utils';


const fakeTranslationAnswers = {
  Hello: "Salve", 
  Goodbye: "Vale", 
  nonsense: "none"
};

let getAllByRole, getByText, getByRole;

beforeEach(async () => {
  ({ getAllByRole, getByText, getByRole } = renderWithWrappers(<MatchingCard translationAnswers={fakeTranslationAnswers}
    setCurrentCard={() => {}} 
  />));

  await waitForElement(
    () => getAllByRole("textbox")
  );
});

it("first word selected changes clicked word to selected state", () => {
  expect(getAllByRole("textbox")[0]).toHaveValue("Hello");
  fireEvent.click(getByText("Hello"));
  expect(getAllByRole("textbox")[0]).toHaveClass("selected");
});

it("second and correct word selected changes both clicked words to correct state then fades to disabled", async () => {
  expect(getAllByRole("textbox")[0]).toHaveValue("Hello");
  
  fireEvent.click(getByText("Hello"));
  fireEvent.click(getByText("Salve"));

  expect(getAllByRole("textbox")[0]).toHaveClass("correct");
  expect(getAllByRole("textbox")[1]).toHaveClass("correct");

  await waitForDomChange();

  expect(getAllByRole("textbox")[0]).toHaveClass("disabled");
  expect(getAllByRole("textbox")[1]).toHaveClass("disabled");
});

it("disabled words cannot be clicked again", async () => {
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

it("second and incorrect word selected changes both clicked words to incorrect state then fades to untouched", async () => {
  expect(getAllByRole("textbox")[0]).toHaveValue("Hello");
  
  fireEvent.click(getByText("Hello"));
  fireEvent.click(getByText("Goodbye"));

  expect(getAllByRole("textbox")[0]).toHaveClass("incorrect");
  expect(getAllByRole("textbox")[2]).toHaveClass("incorrect");

  await waitForDomChange();

  expect(getAllByRole("textbox")[0]).toHaveClass("untouched");
  expect(getAllByRole("textbox")[2]).toHaveClass("untouched");
});

xit("last correct match enables check button", async () => {
  expect(getAllByRole("textbox")[0]).toHaveValue("Hello");
  
  act(() => {
    fireEvent.click(getByText("Hello"));
    fireEvent.click(getByText("Salve"));
  });

  act(() => {
    fireEvent.click(getByText("Goodbye"));
    fireEvent.click(getByText("Vale"));
  });

  act(() => {
    fireEvent.click(getByText("nonsense"));
    fireEvent.click(getByText("none"));
  });

  expect(getByRole("button")).toHaveClass("enabled");
});