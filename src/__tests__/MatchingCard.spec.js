import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';
import { MatchingCard } from '../Card/MatchingCard';
import React from 'react';
import { renderWithWrappers } from './test-utils';
//for flat method
import 'core-js';

const fakeTranslationAnswers = {
    Hello: "salve", 
    Goodbye: "Vale", 
    nonsense: "nonsense", 
    fake: "fake", 
    five: "five"
};

test("first click changes clicked button to selected state", () => {
  renderWithWrappers(<MatchingCard translationAnswers={fakeTranslationAnswers}
                                   setCurrentCard={() => {}} />);

  expect(screen.queryByRole("input")).toHaveTextContent("Hello");
});