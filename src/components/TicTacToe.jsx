import React from 'react';
import styled from 'styled-components';
import Board from './Board';
import Reset from './Reset';
import { useMachine } from "@xstate/react";
import { ticTacToeMachine } from './ticTacToeMachine';

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #333366;
`;

const Title = styled.h1`
  color: #FBFBFB;
`;

const Turn = styled.h3`
  color: #FBFBFB;
  margin-bottom: 4vh;
`;

const ResultMessage = styled.h2`
  color: #FFD700;
  margin-bottom: 4vh;
`;

const TicTacToe = () => {

  const [state, send] = useMachine(ticTacToeMachine, { devTools: true });
  const { winner, moves, player } = state.context;

  const isGameEnded = state.matches('gameEnded');

  console.log(winner);
  console.log(moves);

  let resultMessage = null;
  if (isGameEnded) {
    if (winner) {
      resultMessage = `Player ${winner.toUpperCase()} wins!`;
    } 
    else if (moves >= 9 && !winner) {
      resultMessage = 'Its a draw!';
    }
  }

  return (
    <StyledLayout>
        <Title>TicTacToe Game</Title>
        {!isGameEnded && <Turn>{player.toUpperCase()} move</Turn>}
        {isGameEnded && <ResultMessage>{resultMessage}</ResultMessage>}
        <Board state={state} send={send}/>
        <Reset send={send}/>
    </StyledLayout>
  )
}

export default TicTacToe
