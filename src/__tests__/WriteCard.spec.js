import 'core-js';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitForElement } from '@testing-library/react';
import React from 'react';
import { renderWithWrappers } from '../test-utils';
import { WriteAnswerCard } from '../components/Card/WriteAnswerCard';


const fakeTranslationAnswers = {
  Hello: "Salve", 
  Goodbye: "Vale", 
  nonsense: "none", 
  fake: "is", 
  five: "ve"
};

let getByText, getByRole;

beforeEach(async () => {
  ({ getByText, getByRole } = renderWithWrappers(
    <WriteAnswerCard translationAnswers={fakeTranslationAnswers}
      incrementCard={() => {}} 
      prompt="Type translation"
      translation={fakeTranslationAnswers["Hello"]}
      currentEnglish="Hello"
    />));

  await waitForElement(
    () => getByText("Hello")
  );
});

test("Check button shows is correct when answer is correct", () => {
  fireEvent.change(getByRole("textbox"), {target: {value: "salve"}});
  fireEvent.click(getByText("Check"));

  expect(getByText("Check")).toHaveClass("correct");
});

test("Check button shows is incorrect when answer is wrong", () => {
  fireEvent.change(getByRole("textbox"), {target: {value: "super wrong"}});
  fireEvent.click(getByText("Check"));

  expect(getByText("Check")).toHaveClass("incorrect");
});