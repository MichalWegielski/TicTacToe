import React from 'react';
import styled from 'styled-components';
import Tile from './Tile';

const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  background-color: #33336F;
  border-radius: 10px;
  width: 50vmin;
  height: 50vmin;
  box-shadow: -4vmin 4vmin 6vmin black;
`;

function range(start, end) {
  return Array(end - start)
    .fill(null)
    .map((_, i) => i + start);
}

const Board = () => {

return (
  <>
      <StyledBoard>
          {range(0, 9).map((index) => (
              <Tile key={index} index={index} onClick={() => console.log(`Clicked ${index}`)} />
          ))}
      </StyledBoard>
  </>
)
}

export default Board
