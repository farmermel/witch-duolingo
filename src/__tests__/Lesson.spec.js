import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';
import { Lesson } from '../Lesson/Lesson.js';
import React from 'react';
import { renderWithRouter } from './test-utils.js';

test('runs tests', () => {
  renderWithRouter(<Lesson />);
  const { input } = setup();
  
  expect(screen.queryByText('Translate this sentence')).toBeDefined();
  expect(screen.getByText('Check').toHaveProperty('disabled'));
  fireEvent.change(input, { target: { value: 'Hi' } });
  expect(input.value).toBe('Hi');
//   fireEvent.click(screen.getByText("Pay the Price"));
//   expect(screen.queryByText("First Lesson")).toBeDefined();
});
