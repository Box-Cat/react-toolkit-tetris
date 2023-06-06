import React, { useState, useEffect } from 'react'
import { StyledKeyBoard } from './styles'
import Button from './Button/Button'

type Props = {
  reset: () => void,
  leftByBtn: () => void,
  rightByBtn: () => void,
  downByBtn: () => void,
  rotateByBtn: () => void,
  pauseGame: () => void,
  hardDropByBtn: () => void,
  soundByBtn: () => void,
}

const KeyBoard = (props: Props) => {

  const [sound, setSound] =useState('S');
  const [reset, setReset] =useState('R');
  const [pause, setPause] =useState('P');

  useEffect(() => {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
      }
    });

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 400) {
        setSound('♪');
        setReset('▶');
        setPause('∥');
      }else if(screenWidth > 400){
        setSound('S');
        setReset('R');
        setPause('P');
      }
    };
 
    window.addEventListener('resize', handleResize);
    handleResize();
  }, []);

  return (
    <StyledKeyBoard>
      {/* Pause 버튼 ▶ ♪ */}
      <Button
        bgColor={'108, 108, 108'}
        width={'52px'}
        height={'52px'}
        mediaWidth={'6vh'}
        mediaHeight={'6vh'}
        top={'5%'}
        left={'5%'}
        content={pause}
        click={props.pauseGame}
      />
      {/* Sounds 버튼 */}
      <Button
        bgColor={'108, 108, 108'}
        width={'52px'}
        height={'52px'}
        mediaWidth={'6vh'}
        mediaHeight={'6vh'}
        top={'5%'}
        left={'20%'}
        content={sound}
        click={props.soundByBtn}
      />
      {/* Reset 버튼 */}
      <Button
        bgColor={'221, 26, 26'}
        width={'52px'}
        height={'52px'}
        mediaWidth={'6vh'}
        mediaHeight={'6vh'}
        top={'5%'}
        left={'35%'}
        content={reset}
        click={props.reset}
      />
      {/* Drop 버튼 */}
      <Button
        bgColor={'30, 169, 172'}
        width={'20vh'}
        height={'20vh'}
        mediaWidth={'20vh'}
        mediaHeight={'20vh'}
        top={'30%'}
        left={'10%'}
        content={"Drop"}
        click={props.hardDropByBtn}
      />
      {/* 회전키 */}
      <Button
        bgColor={'30, 169, 172'}
        width={'70px'}
        height={'70px'}
        mediaWidth={'7vh'}
        mediaHeight={'7vh'}
        top={'10%'}
        left={'70%'}
        content={"↺"}
        click={props.rotateByBtn}
      />
      {/* 왼방향 */}
      <Button
        bgColor={'30, 169, 172'}
        width={'70px'}
        height={'70px'}
        mediaWidth={'7vh'}
        mediaHeight={'7vh'}
        top={'30%'}
        left={'60%'}
        content={"⬅"}
        click={props.leftByBtn}
      />
      {/* 오른방향 */}
      <Button
        bgColor={'30, 169, 172'}
        width={'70px'}
        height={'70px'}
        mediaWidth={'7vh'}
        mediaHeight={'7vh'}
        top={'30%'}
        left={'80%'}
        content={"➡"}
        click={props.rightByBtn}
      />
      {/* 아래방향 */}
      <Button
        bgColor={'30, 169, 172'}
        width={'70px'}
        height={'70px'}
        mediaWidth={'7vh'}
        mediaHeight={'7vh'}
        top={'50%'}
        left={'70%'}
        content={"⬇"}
        click={props.downByBtn}
      />


    </StyledKeyBoard>
  )
}

export default KeyBoard