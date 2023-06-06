import React, { useEffect } from 'react'
import { StyledNext, StyledNextPreview } from './styles'
import Cell from '../Cell/Cell'
import { NEXT_WIDTH, NEXT_HEIGHT } from '../../utils/field'
import { StyledField } from '../Field/styles'
import { FIELD } from '../../utils/field'
import { FIELDCELL } from '../../utils/field'


type Props = {
  nextField: FIELD;
};

const Next = (props: Props) => {
  useEffect(() => {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.code === 'ArrowUp') {
        event.preventDefault();
      }
    });
  }, []);

  return (
    <StyledNext>
      <StyledNextPreview>
        <StyledField width={NEXT_WIDTH} height={NEXT_HEIGHT}>
          {props.nextField.map((row: FIELDCELL[]) => row.map((cell: FIELDCELL, x: number) => <Cell key={x} type={cell[0]} />))}
        </StyledField>
      </StyledNextPreview>
    </StyledNext>
  );
};

export default Next;