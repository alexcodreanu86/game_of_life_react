import Cell from './Cell';
import { mergeUniqueCells } from './utility';

function getAllNeighbors(cell: Cell, allCells: Cell[]) : Cell[] {
  return allCells.filter(other => cell.isNeighbor(other));
}

const neighborhoodOffset = [-1, 0, 1];

function cellNeighborhood(cell: Cell) : Cell[]{
  return neighborhoodOffset.reduce((accumulator: Cell[], xOffset: number) => {
    return accumulator.concat(
      neighborhoodOffset.map(yOffset =>
        new Cell(cell.x + xOffset, cell.y + yOffset)
      )
    )
  }, []);
}

function getAllPotentialNeighbors(cell: Cell) : Cell[] {
  return cellNeighborhood(cell)
    .filter(other => !cell.equals(other));
}

function getPotentialBabies(currentGeneration: Cell[]): Cell[] {
  const babies = currentGeneration.reduce((accumulator: Cell[], cell: Cell) => {
    return mergeUniqueCells(accumulator, getCellPotentialBabies(cell, currentGeneration));
  }, []);
  return babies;
}

function getCellPotentialBabies(cell: Cell, currentGeneration: Cell[]): Cell[] {
  return getAllPotentialNeighbors(cell).filter(nextGenBaby => {
    return currentGeneration.every(liveCell => !liveCell.equals(nextGenBaby));
  });
}

export { getAllNeighbors, getAllPotentialNeighbors, getPotentialBabies };
