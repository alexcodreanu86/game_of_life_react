import Cell from './Cell';
import { getAllNeighbors, getAllPotentialNeighbors, getPotentialBabies } from './census';

describe('Census', () => {
  describe('getAllNeighbors', () => {
    const cell = new Cell(0, 0);

    it('returns no neighbors when a world is empty', () => {
      const allCells: Cell[] = [];

      expect(getAllNeighbors(cell, allCells)).toEqual([]);
    });

    it('returns neighbor cells when there are any', () => {
      const neighbor = new Cell(1, 1);
      const allCells: Cell[] = [neighbor];

      expect(getAllNeighbors(cell, allCells)).toEqual([neighbor]);
    });

    it('returns only neighbors', () => {
      const neighbor1 = new Cell(1, 1);
      const neighbor2 = new Cell(0, 1);
      const distantCell = new Cell(6, 10);
      const allCells: Cell[] = [neighbor1, neighbor2, cell, distantCell];

      expect(getAllNeighbors(cell, allCells)).toEqual([neighbor1, neighbor2]);
    });
  });

  describe('getAllPotentialNeighbors', () => {
    it('returns all neighbors for a given cell', () => {
      const centerCell = new Cell(1, 1);
      const allPotentialNeighbors = [
        new Cell(0, 0),
        new Cell(0, 1),
        new Cell(0, 2),
        new Cell(1, 0),
        new Cell(1, 2),
        new Cell(2, 0),
        new Cell(2, 1),
        new Cell(2, 2),
      ];

      expect(getAllPotentialNeighbors(centerCell)).toEqual(allPotentialNeighbors);
    });
  });

  describe('getPotentialBabies', () => {
    it('returns neighbors that are not alive yet', () => {
      const centerCell = new Cell(1, 1);
      const neighbor = new Cell(0, 1);
      const allPotentialBabies = [
        new Cell(0, 0),
        new Cell(0, 2),
        new Cell(1, 0),
        new Cell(1, 2),
        new Cell(2, 0),
        new Cell(2, 1),
        new Cell(2, 2),
        new Cell(-1, 0),
        new Cell(-1, 1),
        new Cell(-1, 2),
      ];

      expect(getPotentialBabies([centerCell, neighbor])).toEqual(allPotentialBabies);
    });
  });
});