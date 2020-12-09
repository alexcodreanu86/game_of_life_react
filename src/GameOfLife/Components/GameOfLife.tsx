import * as React from 'react';
import { combine } from '../utility';
import gameOfLifeReducer, {
  addCellAction,
  calculateNextGenerationAction,
  changeConfigAction,
  defaultState,
  removeCellAction,
} from './game-of-life-reducer';
import './GameOfLife.css';
import { GameOfLifeGrid } from './GameOfLifeGrid';
import { GameOfLifeSetup } from './GameOfLifeSetup';

const GameOfLife = () => {
  const [state, dispatch] = React.useReducer(gameOfLifeReducer, defaultState)

  const tick = combine(calculateNextGenerationAction, dispatch)
  const onChange = combine(changeConfigAction, dispatch)
  const onAddCell = combine(addCellAction, dispatch)
  const onKillCell = combine(removeCellAction, dispatch)

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
