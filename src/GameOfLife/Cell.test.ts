import { CellBehavior } from './Cell';

describe('Cell', () => {
  describe('isNeighbor', () => {
    it('returns false for an identical cell', () => {
      const cell = CellBehavior.new(0, 0);

      expect(CellBehavior.isNeighbor(cell, cell)).toBe(false);
    });

    it('returns false when the neighbor is far away on x axis', () => {
      const cell = CellBehavior.new(0, 0);
      const distantCell = CellBehavior.new(2, 0);

      expect(CellBehavior.isNeighbor(cell, distantCell)).toBe(false);
    });

    it('returns false when the neighbor is far away on y axis', () => {
      const cell = CellBehavior.new(0, 0);
      const distantCell = CellBehavior.new(0, 2);

      expect(CellBehavior.isNeighbor(cell, distantCell)).toBe(false);
    });

    it('returns true when other cell is a neighbor', () => {
      const cell = CellBehavior.new(0, 0);
      const neighbor = CellBehavior.new(1, 1);

      expect(CellBehavior.isNeighbor(cell, neighbor)).toBe(true);
    });
  });
});