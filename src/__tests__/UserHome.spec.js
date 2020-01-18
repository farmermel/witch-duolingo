import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { renderWithRouter } from './test-utils';
import { UserHome } from '../UserHome/UserHome';

test('renders main page', () => {
  const {getByRole} = renderWithRouter(<UserHome />, {route:"/user-home"});

  expect(getByRole("main")).toBeInTheDocument();
});