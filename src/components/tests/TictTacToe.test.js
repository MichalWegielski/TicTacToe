import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from '../TicTacToe'; 

test('It renders TicTacToe game with 9 div elements', () => {
  
  render(<TicTacToe />);
  
  const boardTiles = screen.getAllByRole('boardCell'); 
  
  expect(boardTiles).toHaveLength(9);

  fireEvent.click(boardTiles[0]);
});
