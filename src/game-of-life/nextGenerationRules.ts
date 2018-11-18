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

function nextGenerationPopulation(currentPopulation: Cell[]) : Cell[] {
  return getSurvivingCells(currentPopulation)
    .concat(newlyBornCells(currentPopulation));
}

export { nextGenerationPopulation };