import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


test('renders learn react link', () => {
  
const { asFragment } = render(<App/>)
  expect(asFragment()).not.toBeUndefined();
//  expect(asFragment()).toMatchSnapshot();
});
