import React from 'react';
import { UserHome } from '../UserHome/UserHome';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouter } from '../test-utils';

test('renders main page', () => {
  const {getByRole} = renderWithRouter(<UserHome />, {route:"/user-home"});
  console.log(window.location.href);

  console.log(typeof(container));
  expect(getByRole("main")).toBeInTheDocument();
});