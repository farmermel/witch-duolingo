import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';
import { MatchingCard } from '../Card/MatchingCard';
import React from 'react';
import { renderWithWrappers } from './test-utils';

test("first click changes clicked button to selected state", () => {
    renderWithWrappers(<MatchingCard translationAnswers={{Hello: "salve", Goodbye: "Vale"}} />);

    expect(screen.queryByRole(input)).toHaveTextContent("Hello");
})