import React from 'react';
import styled from 'styled-components';

const StyledTile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: ${({ index }) => (index >= 3 ? '3px solid #000060' : 'none')};
  border-left: ${({ index }) => (index % 3 !== 0 ? '3px solid #000060' : 'none')};
  border-bottom: ${({ index }) => (index < 6 ? '3px solid #000060' : 'none')};
  border-right: ${({ index }) => (index % 3 !== 2 ? '3px solid #000060' : 'none')};
  margin: 3px;
  transition: background-color 0.3s;
  font-size: 2rem;
  color: #FBFBFB;

  &:hover {
    background-color: #33336A;
    cursor: pointer;
  }
`;

const Tile = ({ index, onClick, value }) => {
  return (
    <StyledTile index={index} onClick={onClick} role="boardCell">
      {value}
    </StyledTile>
  )
}

export default Tile;
