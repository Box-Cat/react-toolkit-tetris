import React from 'react'
import { StyledCell } from './styles';
import { TETROMINOS } from '../../utils/tetrominos';

type Props = {
  type: keyof typeof TETROMINOS;
};

const Cell = ({ type }:Props) => {
  return (
    <StyledCell type={type} />
  );
}

export default Cell;