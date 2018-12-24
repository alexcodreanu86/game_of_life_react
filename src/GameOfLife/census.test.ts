import { CellBehavior, CellState } from './Cell';
import { getAllNeighbors, getAllPotentialNeighbors, getPotentialBabies } from './census';

describe('Census', () => {
  describe('getAllNeighbors', () => {
    const cell = CellBehavior.new(0, 0);

    it('returns no neighbors when a world is empty', () => {
      const allCells: CellState[] = [];

      expect(getAllNeighbors(cell, allCells)).toEqual([]);
    });

    it('returns neighbor cells when there are any', () => {
      const neighbor = CellBehavior.new(1, 1);
      const allCells: CellState[] = [neighbor];

      expect(getAllNeighbors(cell, allCells)).toEqual([neighbor]);
    });

    it('returns only neighbors', () => {
      const neighbor1 =   CellBehavior.new(1, 1);
      const neighbor2 =   CellBehavior.new(0, 1);
      const distantCell = CellBehavior.new(6, 10);
      const allCells: CellState[] = [neighbor1, neighbor2, cell, distantCell];

      expect(getAllNeighbors(cell, allCells)).toEqual([neighbor1, neighbor2]);
    });
  });

  describe('getAllPotentialNeighbors', () => {
    it('returns all neighbors for a given cell', () => {
      const centerCell = { x: 1, y: 1 };
      const allPotentialNeighbors = [
        CellBehavior.new(0, 0),
        CellBehavior.new(0, 1),
        CellBehavior.new(0, 2),
        CellBehavior.new(1, 0),
        CellBehavior.new(1, 2),
        CellBehavior.new(2, 0),
        CellBehavior.new(2, 1),
        CellBehavior.new(2, 2),
      ];

      expect(getAllPotentialNeighbors(centerCell)).toEqual(allPotentialNeighbors);
    });
  });

  describe('getPotentialBabies', () => {
    it('returns neighbors that are not alive yet', () => {
      const centerCell = { x: 1, y: 1 };
      const neighbor = { x: 0, y: 1 };
      const allPotentialBabies = [
        CellBehavior.new(0, 0),
        CellBehavior.new(0, 2),
        CellBehavior.new(1, 0),
        CellBehavior.new(1, 2),
        CellBehavior.new(2, 0),
        CellBehavior.new(2, 1),
        CellBehavior.new(2, 2),
        CellBehavior.new(-1, 0),
        CellBehavior.new(-1, 1),
        CellBehavior.new(-1, 2),
      ];

      expect(getPotentialBabies([centerCell, neighbor])).toEqual(allPotentialBabies);
    });
  });
});