import Cell from './Cell';

describe('Cell', () => {
  describe('isNeighbor', () => {
    it('returns false for an identical cell', () => {
      const cell = new Cell(0, 0);

      expect(cell.isNeighbor(cell)).toBe(false);
    });
  });
});