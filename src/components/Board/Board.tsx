import React from 'react';
import { StyledBoard, StyledLeftBoard, StyledRightBoard } from './styles';
import Next from '../Next/Next';
import Field from '../Field/Field';
import GameStatus from '../GameStatus/GameStatus';
import type { FIELD } from '../../utils/field';

type Props = {
  field: FIELD;
  nextField: FIELD;
};

const Board: React.FC<Props> = (props) => {
  return (
    <StyledBoard>
      <StyledLeftBoard>
        <Field field={props.field} />
      </StyledLeftBoard>
      <StyledRightBoard>
        <Next nextField={props.nextField} />
        <GameStatus />
      </StyledRightBoard>
    </StyledBoard>
  );
};

export default Board;
