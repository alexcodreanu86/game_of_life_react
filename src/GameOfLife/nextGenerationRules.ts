import Cell from './Cell';
import { getAllNeighbors, getPotentialBabies } from './census';

const MIN_NEIGHBORS_TO_SURVIVE = 2;
const MAX_NEIGHBORS_TO_SURVIVE = 3;

function getSurvivingCells(currentPopulation: Cell[]) : Cell[]{
  return currentPopulation.filter(cell => {
      const numberOfNeighbors = getAllNeighbors(cell, currentPopulation).length;
      return numberOfNeighbors >= MIN_NEIGHBORS_TO_SURVIVE &&
        numberOfNeighbors <= MAX_NEIGHBORS_TO_SURVIVE;
    }
  );
}

function newlyBornCells(currentPopulation: Cell[]) : Cell[]{
  return getPotentialBabies(currentPopulation)
    .filter(cell =>
      getAllNeighbors(cell, currentPopulation).length === 3
    );
}

function nextGenerationPopulation(currentPopulation: Cell[], worldSize: number = 10) : Cell[] {
  const boundaryCoord = worldSize / 2;
  return getSurvivingCells(currentPopulation)
    .concat(newlyBornCells(currentPopulation))
    .filter(cell =>
      Math.abs(cell.x) <= boundaryCoord &&
      Math.abs(cell.y) <= boundaryCoord
    );
}

export { nextGenerationPopulation };