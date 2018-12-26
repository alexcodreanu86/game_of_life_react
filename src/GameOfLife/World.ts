import { CellBehavior, CellState } from './Cell';
import { nextGenerationPopulation } from './nextGenerationRules';

interface WorldState {
  cells: CellState[];
  size: number;
}

const WorldBehaviorFactory = (nextGenPopulation: ((currentGen: CellState[], worldSize: number) => CellState[]) = nextGenerationPopulation) => {
  const newWorld = (cells: CellState[], size: number) => ({cells, size});
  const isEmpty = (world: WorldState) => world.cells.length === 0;
  const addCell = (world: WorldState, cell: CellState) =>
      newWorld(
        world.cells.concat([cell]),
        world.size
      );

  const removeCell = (world: WorldState, cell: CellState) =>
    newWorld(
      world.cells.filter(worldCell => !CellBehavior.equals(worldCell, cell)),
      world.size
    );
  const tick = (world: WorldState) =>
    newWorld(
      nextGenPopulation(world.cells, world.size),
      world.size
    );


  return {
    addCell,
    isEmpty,
    new: (cells: CellState[] = [], size: number = 4) => ({ cells, size }),
    removeCell,
    tick
  }
};

const WorldBehavior = WorldBehaviorFactory();

export { WorldState, WorldBehavior, WorldBehaviorFactory };
