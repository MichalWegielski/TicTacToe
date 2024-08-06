import React from 'react';
import styled from 'styled-components';
import Board from './Board';
import Reset from './Reset';

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

const Turn = styled.div`
  color: #FBFBFB;
  margin-bottom: 4vh;
`;

const TicTacToe = () => {
  return (
    <StyledLayout>
        <Title>TicTacToe Game</Title>
        <Turn>{} move</Turn>
        <Board/>
        <Reset/>
    </StyledLayout>
  )
}

export default TicTacToe
