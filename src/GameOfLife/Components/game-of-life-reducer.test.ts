import gameOfLifeReducer, {
  addCellAction,
  calculateNextGenerationAction,
  defaultState,
  removeCellAction
} from './game-of-life-reducer';

describe('gameOfLifeReducer', () => {
  it('defaultState has empty world', () => {
    expect(defaultState.world.size).toEqual(4)
    expect(defaultState.world.cells).toEqual([{ x: 0, y: 0 }])
  })

  it('adds a cell', () => {
    const { world: { cells }} = gameOfLifeReducer(defaultState, addCellAction({ x: 1, y: 1 }))
    expect(cells).toEqual([{x: 0, y: 0}, {x: 1, y: 1}])
  })

  it('removes a cell', () => {
    const { world: { cells }} = gameOfLifeReducer(defaultState, removeCellAction({ x: 0, y: 0 }))
    expect(cells).toEqual([])
  })

  it('calculates next generation', () => {
    const stateWithTwoCells = gameOfLifeReducer(defaultState, addCellAction({ x: 0, y: 1 }))
    const stateWithThreeCells = gameOfLifeReducer(stateWithTwoCells, addCellAction({ x: 0, y: 2 }))

    const { world: { cells }} = gameOfLifeReducer(stateWithThreeCells, calculateNextGenerationAction())

    expect(cells).toEqual([{x: 0, y: 1}, {x: -1, y: 1}, {x: 1, y: 1}])
  })
})
