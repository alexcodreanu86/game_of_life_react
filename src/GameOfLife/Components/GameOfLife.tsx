import * as React from 'react';
import { CellState } from '../Cell';
import gameOfLifeReducer, {
  addCellAction,
  calculateNextGenerationAction,
  changeConfigAction,
  defaultState,
  removeCellAction,
} from './game-of-life-reducer';
import './GameOfLife.css';
import { GameOfLifeGrid } from './GameOfLifeGrid';
import { GameOfLifeConfig, GameOfLifeSetup } from './GameOfLifeSetup';

const GameOfLife = () => {
  const [state, dispatch] = React.useReducer(gameOfLifeReducer, defaultState)

  const tick = () => {
    dispatch(calculateNextGenerationAction());
  };

  const onChange = (gameOfLifeConfig: GameOfLifeConfig) => {
    dispatch(changeConfigAction(gameOfLifeConfig))
  };

  const onAddCell = (cell: CellState) => {
    dispatch(addCellAction(cell))
  };

  const onKillCell = (cell: CellState) => {
    dispatch(removeCellAction(cell))
  }

  return (<>
    <GameOfLifeSetup onChange={onChange}/>
    <button onClick={tick}>Tick</button>
    <GameOfLifeGrid
        size={state.world.size}
        liveCells={state.world.cells}
        onAddCell={onAddCell}
        onKillCell={onKillCell}/>
  </>)
}

export default GameOfLife;
