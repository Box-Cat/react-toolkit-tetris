import React from 'react';
import Cell from '../Cell/Cell';
import { StyledField } from './styles';
import type { FIELD } from '../../utils/field';
import { FIELDCELL } from '../../utils/field';
import { FIELD_WIDTH, FIELD_HEIGHT } from '../../utils/field';

type Props = {
  field: FIELD;
};

const Field = ({ field }: Props) => {
  return (
    <StyledField width={FIELD_WIDTH} height={FIELD_HEIGHT}>
        {field.map((row: FIELDCELL[]) => row.map((cell: FIELDCELL, x: number)=><Cell key={x} type={cell[0]}/>))}
    </StyledField>
  );
};

export default Field;