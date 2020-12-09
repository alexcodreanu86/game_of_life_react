import { CellBehavior, CellState } from '../Cell';
import { WorldBehavior, WorldState } from '../World';
import { GameOfLifeConfig } from './GameOfLifeSetup';

export const NEXT_GENERATION = 'NEXT_GENERATION';
export const CONFIG_CHANGE = 'CONFIG_CHANGE';
export const ADD_CELL = 'ADD_CELL';
export const REMOVE_CELL = 'REMOVE_CELL';

interface Action {
  type: string
  payload?: any
}

export interface GameOfLifeState {
  world: WorldState
  worldSize: number
}

export const defaultState: GameOfLifeState = {
  world: WorldBehavior.addCell(WorldBehavior.new(), CellBehavior.new(0, 0)),
  worldSize: 0
};

const gameOfLifeReducer = (state: GameOfLifeState, action: Action) => {
  if (action.type === NEXT_GENERATION) {
    const world =  WorldBehavior.tick(state.world);
    return { ...state, world }
  }

  if (action.type === CONFIG_CHANGE) {
   const { payload: { worldSize } } = action;

    if (state.worldSize === worldSize) {
      return state
    }

    const world = WorldBehavior.new(state.world.cells, worldSize);

    return { ...state, world};
  }

  if (action.type === ADD_CELL) {
    const { payload: cell } = action
    const world = WorldBehavior.addCell(state.world, cell);

    return {...state, world };
  }

  if (action.type === REMOVE_CELL) {
    const { payload: cell } = action
    const world = WorldBehavior.removeCell(state.world, cell);

    return {...state, world };
  }

  return state
}

export const removeCellAction = (cell: CellState) => ({type: REMOVE_CELL, payload: cell})

export const addCellAction = (cell: CellState) => ({type: ADD_CELL, payload: cell})

export const changeConfigAction = (gameOfLifeConfig: GameOfLifeConfig) => ({type: CONFIG_CHANGE, payload: gameOfLifeConfig})

export const calculateNextGenerationAction = () => ({type: NEXT_GENERATION})

export default gameOfLifeReducer
