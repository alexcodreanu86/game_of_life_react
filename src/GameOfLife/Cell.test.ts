import Cell from './Cell';

describe('Cell', () => {
  describe('isNeighbor', () => {
    it('returns false for an identical cell', () => {
      const cell = new Cell(0, 0);

      expect(cell.isNeighbor(cell)).toBe(false);
    });

    it('returns false when the neighbor is far away on x axis', () => {
      const cell = new Cell(0, 0);
      const distantCell = new Cell(2, 0);

      expect(cell.isNeighbor(distantCell)).toBe(false);
    });

    it('returns false when the neighbor is far away on y axis', () => {
      const cell = new Cell(0, 0);
      const distantCell = new Cell(0, 2);

      expect(cell.isNeighbor(distantCell)).toBe(false);
    });

    it('returns true when other cell is a neighbor', () => {
      const cell = new Cell(0, 0);
      const distantCell = new Cell(1, 1);

      expect(cell.isNeighbor(distantCell)).toBe(true);
    });
  });
});