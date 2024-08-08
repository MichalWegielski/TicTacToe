import React from 'react';
import styled from 'styled-components';

const StyledReset = styled.button`
  padding: 10px;
  background-color: #ff6347;
  border: none;
  border-radius: 10px;
  color: #FBFBFB;
  cursor: pointer;
  margin-top: 8vh;
  width: 20vmin;
  height: 8vmin;
  box-shadow: -2vmin 2vmin 4vmin black;
  transition: background-color 0.3s;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background-color: #ff6341;
    cursor: pointer;
  }
`;

const Reset = ({ send }) => {
  return (
    <>
        <StyledReset onClick={() => send({ type: 'RESET' })}>Reset</StyledReset>
    </>
  )
}

export default Reset
