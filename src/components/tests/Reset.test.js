import { render, screen, fireEvent } from '@testing-library/react';
import Reset from '../Reset'; 

test('Render and handle of reset button', () => {
  const send = jest.fn();

  render(<Reset send={send} />);

  const button = screen.getByText('Reset');
  fireEvent.click(button);
  expect(send).toHaveBeenCalledWith({ type: 'RESET' });
});
