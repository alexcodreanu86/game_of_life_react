import { CellBehavior, CellState } from './Cell';
import { mergeUniqueCells } from './utility';

function getAllNeighbors(cell: CellState, allCells: CellState[]) : CellState[] {
  return allCells.filter(other => CellBehavior.isNeighbor(cell, other));
}

const neighborhoodOffset = [-1, 0, 1];

function cellNeighborhood(cell: CellState) : CellState[]{
  return neighborhoodOffset.reduce((accumulator: CellState[], xOffset: number) => {
    return accumulator.concat(
      neighborhoodOffset.map(yOffset =>
        ({ x: cell.x + xOffset, y: cell.y + yOffset })
      )
    )
  }, []);
}

function getAllPotentialNeighbors(cell: CellState) : CellState[] {
  return cellNeighborhood(cell)
    .filter(other => !CellBehavior.equals(cell, other));
}

function getPotentialBabies(currentGeneration: CellState[]): CellState[] {
  const babies = currentGeneration.reduce((accumulator: CellState[], cell: CellState) => {
    return mergeUniqueCells(accumulator, getCellPotentialBabies(cell, currentGeneration));
  }, []);
  return babies;
}

function getCellPotentialBabies(cell: CellState, currentGeneration: CellState[]): CellState[] {
  return getAllPotentialNeighbors(cell).filter(nextGenBaby => {
    return currentGeneration.every(liveCell => !CellBehavior.equals(liveCell, nextGenBaby));
  });
}

export { getAllNeighbors, getAllPotentialNeighbors, getPotentialBabies };
