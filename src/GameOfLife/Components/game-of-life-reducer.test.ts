import { CellBehavior } from '../Cell';
import gameOfLifeReducer, {
  addCellAction,
  calculateNextGenerationAction,
  defaultState,
  removeCellAction
} from './game-of-life-reducer';

describe('gameOfLifeReducer', () => {
  it('defaultState has empty world', () => {
    expect(defaultState.world.size).toEqual(4)
    expect(defaultState.world.cells).toEqual([CellBehavior.new(0, 0)])
  })

  it('adds a cell', () => {
    const { world: { cells }} = gameOfLifeReducer(defaultState, addCellAction(CellBehavior.new(1, 1)))
    expect(cells).toEqual([CellBehavior.new(0, 0), CellBehavior.new(1, 1)])
  })

  it('removes a cell', () => {
    const { world: { cells }} = gameOfLifeReducer(defaultState, removeCellAction(CellBehavior.new(0, 0)))
    expect(cells).toEqual([])
  })

  it('calculates next generation', () => {
    const stateWithTwoCells = gameOfLifeReducer(defaultState, addCellAction(CellBehavior.new(0, 1)))
    const stateWithThreeCells = gameOfLifeReducer(stateWithTwoCells, addCellAction(CellBehavior.new(0, 2)))

    const { world: { cells }} = gameOfLifeReducer(stateWithThreeCells, calculateNextGenerationAction())

    expect(cells).toEqual([
      CellBehavior.new(0, 1),
      CellBehavior.new(-1, 1),
      CellBehavior.new(1, 1)
    ])
  })
})
