import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen, waitForElement } from '@testing-library/react';
import { MatchingCard } from '../components/Card/MatchingCard';
import React from 'react';
import { renderWithWrappers } from '../test-utils';
//for flat method
import 'core-js';

const fakeTranslationAnswers = {
  Hello: "salve", 
  Goodbye: "Vale", 
  nonsense: "nonsense", 
  fake: "fake", 
  five: "five"
};

const { getAllByRole } = renderWithWrappers(<MatchingCard translationAnswers={fakeTranslationAnswers}
  setCurrentCard={() => {}} 
/>);

beforeEach(async () => {
  await waitForElement(
    () => getAllByRole("textbox")
  )
})

test("first click changes clicked button to selected state", () => {
  expect(getAllByRole("textbox")[0]).toHaveValue("Hello");
});