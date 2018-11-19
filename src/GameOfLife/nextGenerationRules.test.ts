import Cell from './Cell';
import { nextGenerationPopulation } from './nextGenerationRules';

describe('nextGenerationRules', () => {
  describe('nextGenerationPopulation', () => {
    it('returns no cells for an empty world', () => {
      expect(nextGenerationPopulation([])).toEqual([]);
    });

    it('a lonely cell dies in the next generation', () => {
      const worldCells = [new Cell(0, 0)];

      expect(nextGenerationPopulation(worldCells)).toEqual([]);
    });

    it('a cell surrounded by 2 neighbors lives', () => {
      const centerCell = new Cell(1, 1);
      const worldCells = [
        new Cell(0, 1),
        centerCell,
        new Cell(2, 1)
      ];

      const nextGeneration = nextGenerationPopulation(worldCells);
      const containsCenterCell = nextGeneration.filter(nextGenCell => centerCell.equals(nextGenCell)).length === 1;
      expect(containsCenterCell).toBe(true)
    });

    it('a cell surrounded by 3 neighbors lives', () => {
      const centerCell = new Cell(1, 1);
      const worldCells = [
        new Cell(0, 1),
        centerCell,
        new Cell(2, 1),
        new Cell(1, 2)
      ];

      const nextGeneration = nextGenerationPopulation(worldCells);
      const containsCenterCell = nextGeneration.filter(nextGenCell => centerCell.equals(nextGenCell)).length === 1;
      expect(containsCenterCell).toBe(true)
    });

    it('a cell surrounded by 4 neighbors dies due to overpopulation', () => {
      const centerCell = new Cell(1, 1);
      const worldCells = [
        new Cell(0, 1),
        centerCell,
        new Cell(2, 1),
        new Cell(1, 2),
        new Cell(0, 0)
      ];

      const nextGeneration = nextGenerationPopulation(worldCells);
      const containsCenterCell = nextGeneration.filter(nextGenCell => centerCell.equals(nextGenCell)).length === 1;
      expect(containsCenterCell).toBe(false)
    });

    it('a dead cell surrounded by exactly 3 neighbors comes to life', () => {
      const centerCell = new Cell(1, 1);

      const worldCells = [
        new Cell(0, 1),
        new Cell(2, 1),
        new Cell(1, 2)
      ];

      const nextGeneration = nextGenerationPopulation(worldCells);
      const containsCenterCell = nextGeneration.filter(nextGenCell => centerCell.equals(nextGenCell)).length === 1;
      expect(containsCenterCell).toBe(true)
    });
  })
});