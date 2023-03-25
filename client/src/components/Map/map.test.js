import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './mapjest';

test('Button was not clicked', () => {
  const handleClick = jest.fn();
  const { getByText } = render(<Button label="GO" onClick={handleClick} />);
  const button = getByText('GO');
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(0);
});