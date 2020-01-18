import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from '@testing-library/react';
import { App } from '../App/App.js';
import React from 'react';
import { renderWithRouter } from './test-utils.js';

test('runs tests', () => {
  renderWithRouter(<App />);
  expect(screen.queryByText("money")).toBeDefined();
  fireEvent.click(screen.getByText("Pay the Price"));
  expect(screen.queryByText("First Lesson")).toBeDefined();
});
