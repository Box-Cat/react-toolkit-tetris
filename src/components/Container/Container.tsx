import React, { useState, useRef, useEffect } from 'react'
import Board from '../Board/Board'
import { StyledGameBody, StyledScreenContainer } from './styles'
import KeyBoard from '../KeyBoard/KeyBoard'
import { drawField, isColliding } from '../../utils/field';
import { FIELD_WIDTH, FIELD_HEIGHT, NEXT_WIDTH, NEXT_HEIGHT } from '../../utils/field';
import { usePlayer } from '../../hooks/usePlayer';
import { useField } from '../../hooks/useField';
import { useInterval } from '../../hooks/useInterval';
import { useGameStatus } from '../../hooks/useGameStatus';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux'
import { SetScore, SetRows, SetLevel, SetScoreZero, SetRowsZero, SetLevelOne, SetSound } from '../../redux/reducer/gameStatusSlice';
const themeMp3 = require('../../utils/sound/Theme.mp3');
const gameoverMp3 = require('../../utils/sound/gameover.mp3');
const thumpMp3 = require('../../utils/sound/Thump.wav');
const moveMp3 =require('../../utils/sound/move.wav')
const rotateMp3 =require('../../utils/sound/rotate.wav')

const Container = () => {

  const { player, nextPlayer, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
  const { field, setField, rowsCleared } = useField(player, resetPlayer);
  const { nextField, setNextField } = useField(nextPlayer, resetPlayer);


  const { scoreTmp, setScoreTmp, rowsTmp, setRowsTmp, levelTmp, setLevelTmp } = useGameStatus(rowsCleared);
  const { rows, level } = useSelector((state: any) => state.gameStatusReducer);
  const [dropTime, setDropTime] = useState<null | number>(null);
  const [gameOver, setGameOver] = useState(true);
  const [start, setStart] = useState(true);
  const [pause, setPause] = useState(false);
  const [sound, setSound] = useState(false);
  const themeSound = useRef(new Audio(themeMp3));
  const thumpSound = useRef(new Audio(thumpMp3));
  const gameoverSound = useRef(new Audio(gameoverMp3));
  const moveSound = useRef(new Audio(moveMp3));
  const rotateSound = useRef(new Audio(rotateMp3));
  const myFocus = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const movePlayer = (dir: number) => {
    if (!isColliding(player, field, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  
  const resetGame = () => {
    setField(drawField(FIELD_WIDTH, FIELD_HEIGHT));
    setNextField(drawField(NEXT_WIDTH, NEXT_HEIGHT));
    setDropTime(1000);
    resetPlayer();
    setScoreTmp(0);
    setRowsTmp(0);
    dispatch(SetScoreZero());
    dispatch(SetLevelOne());
    dispatch(SetRowsZero());
    setGameOver(false);
    setPause(false);
    setStart(false);
    if(sound === true) themeSound.current.play();
  }

  const pauseGame = () => {
    setPause((prevState) => !prevState);
  }

  const moveByKey = ({ keyCode }: { keyCode: number; }) => {

    if (keyCode === 82) {
      //다시 시작 r
      resetGame();
    }

    if (!gameOver && keyCode === 80) {
      //pause p
      setPause((prevState) => !prevState);
    }

    if (!gameOver && !pause) {
      if (keyCode === 37) {
        if(sound===true) moveSound.current.play();
        //else moveSound.current.pause();
        movePlayer(-1);
      } else if (keyCode === 39) {
        if(sound===true) moveSound.current.play();
        //else moveSound.current.pause();
        movePlayer(1);
      } else if (keyCode === 40) {
        if(sound===true) moveSound.current.play();
        //else moveSound.current.pause();
        dropPlayer();
      } else if (keyCode === 38) {
        if(sound===true) rotateSound.current.play();
        //else rotateSound.current.pause();
        playerRotate(field);
      } else if (keyCode === 17) {
        //ctrl
        hardDropByBtn();
      }
    }
    if (keyCode === 83) {
      //사운드 s
      soundByBtn();
    }

  }

  const leftByBtn = () => {
    if (!gameOver && !pause){
      movePlayer(-1);
      if(sound===true) moveSound.current.play();
      else moveSound.current.pause();
    } 

  }

  const rightByBtn = () => {
    if (!gameOver && !pause){
      movePlayer(1);
      if(sound===true) moveSound.current.play();
      else moveSound.current.pause();
    } 
  }

  const downByBtn = () => {
    if (!gameOver && !pause){
      dropPlayer();
      if(sound===true) moveSound.current.play();
      else moveSound.current.pause();
    } 
  }

  const rotateByBtn = () => {
    if (!gameOver && !pause){
      playerRotate(field);
      if(sound===true) rotateSound.current.play();
      else rotateSound.current.pause();
    } 

  }
 
  const soundByBtn  = () => {
    setSound(prev => !prev);
    dispatch(SetSound(sound));
  }

  const drop = () => {
    //속도 증가
    try {
      if (!isColliding(player, field, { x: 0, y: 1 })) {
        updatePlayerPos({ x: 0, y: 1, collided: false });
      } else {
        
        // Game over!
        if (player.pos.y < 1) {
          setGameOver(true);
          setDropTime(null);
          if(sound===true){
            themeSound.current.pause();
            gameoverSound.current.currentTime = 0;
            gameoverSound.current.play();
          }else gameoverSound.current.pause();
          return;
        }
        updatePlayerPos({ x: 0, y: 0, collided: true });
      }
    } catch (error) { console.log(error) }

      dispatch(SetRows(rowsTmp));
      dispatch(SetScore(scoreTmp));
      if (rows > level * 10) {
        setLevelTmp(prev => prev + 1);
        dispatch(SetLevel(levelTmp));
        setDropTime(1000 / level + 200);
      }
  }

  const dropPlayer = () => {
    drop();
  }

  useInterval(() => {
    if (!gameOver && !pause) drop();
  }, dropTime)

  const hardDropByBtn = () => {
    if (!pause && !gameOver) {
      while (player.collided === false && gameOver === false) {
        if (!isColliding(player, field, { x: 0, y: 1 })) {
          player.pos.y += 1;
        } else {
          // Game over!
          if (player.pos.y < 1) {
            setGameOver(true);
            setDropTime(null);
          }
          player.collided = true;
        }
      }
      if(sound===true){
        thumpSound.current.currentTime = 0;
        thumpSound.current.play();
      }else thumpSound.current.pause();
      drop();
    }
  }

  const clickFuncs = {
    reset: resetGame,
    leftByBtn: leftByBtn,
    rightByBtn: rightByBtn,
    downByBtn: downByBtn,
    rotateByBtn: rotateByBtn,
    pauseGame: pauseGame,
    hardDropByBtn: hardDropByBtn,
    soundByBtn: soundByBtn,
  };

  const fields = {
    field: field,
    nextField: nextField,
  }

  useEffect(() => {
    if (myFocus.current) {
      myFocus.current.focus();
    }
    if (sound) {
      themeSound.current.play();
      themeSound.current.loop = true;
    } else {
      themeSound.current.pause();
    }
   
  }, [myFocus,sound]);

  return (
    <>
      {/* onKeyDown={move}에서 키보드 조종 ref={myFocus}로 focus */}
      <StyledGameBody role='button' tabIndex={0} onKeyDown={moveByKey} ref={myFocus} >
        <StyledScreenContainer>
          {pause ? <Modal message={'PAUSE'} /> : ""}
          {gameOver && !start ? <Modal message={'GAMEOVER'} /> : ""}
          {gameOver && start ? <Modal message={'Press R!'} /> : ""}
          <Board {...fields} />
        </StyledScreenContainer>
        <KeyBoard {...clickFuncs} />
      </StyledGameBody>
    </>

  )
}

export default Container