import { CellBehavior } from './Cell';
import { nextGenerationPopulation } from './nextGenerationRules';

describe('nextGenerationRules', () => {
  describe('nextGenerationPopulation', () => {
    it('returns no cells for an empty world', () => {
      expect(nextGenerationPopulation([])).toEqual([]);
    });

    it('a lonely cell dies in the next generation', () => {
      const worldCells = [CellBehavior.new(0, 0)];

      expect(nextGenerationPopulation(worldCells)).toEqual([]);
    });

    it('a cell surrounded by 2 neighbors lives', () => {
      const centerCell = CellBehavior.new(1, 1);
      const worldCells = [
        CellBehavior.new(0, 1),
        centerCell,
        CellBehavior.new(2, 1)
      ];

      const nextGeneration = nextGenerationPopulation(worldCells);
      const containsCenterCell = nextGeneration.filter(nextGenCell => CellBehavior.equals(centerCell, nextGenCell)).length === 1;
      expect(containsCenterCell).toBe(true)
    });

    it('a cell surrounded by 3 neighbors lives', () => {
      const centerCell = CellBehavior.new(1, 1);
      const worldCells = [
        CellBehavior.new(0, 1),
        centerCell,
        CellBehavior.new(2, 1),
        CellBehavior.new(1, 2)
      ];

      const nextGeneration = nextGenerationPopulation(worldCells);
      const containsCenterCell = nextGeneration.filter(nextGenCell => CellBehavior.equals(centerCell, nextGenCell)).length === 1;
      expect(containsCenterCell).toBe(true)
    });

    it('a cell surrounded by 4 neighbors dies due to overpopulation', () => {
      const centerCell = CellBehavior.new(1, 1);
      const worldCells = [
        CellBehavior.new(0, 1),
        centerCell,
        CellBehavior.new(2, 1),
        CellBehavior.new(1, 2),
        CellBehavior.new(0, 0)
      ];

      const nextGeneration = nextGenerationPopulation(worldCells);
      const containsCenterCell = nextGeneration.filter(nextGenCell => CellBehavior.equals(centerCell, nextGenCell)).length === 1;
      expect(containsCenterCell).toBe(false)
    });

    it('a dead cell surrounded by exactly 3 neighbors comes to life', () => {
      const centerCell = CellBehavior.new(1, 1);

      const worldCells = [
        CellBehavior.new(0, 1),
        CellBehavior.new(2, 1),
        CellBehavior.new(1, 2)
      ];

      const nextGeneration = nextGenerationPopulation(worldCells);
      const containsCenterCell = nextGeneration.filter(nextGenCell => CellBehavior.equals(centerCell, nextGenCell)).length === 1;
      expect(containsCenterCell).toBe(true)
    });

    it('cells out of bounds do not survive', () => {
      const worldCells = [
        CellBehavior.new(10, 10),
        CellBehavior.new(10, 11),
        CellBehavior.new(11, 10),
        CellBehavior.new(11, 11),
      ];

      const nextGeneration = nextGenerationPopulation(worldCells, 20);
      expect(nextGeneration).toEqual([CellBehavior.new(10, 10)]);
    });
  })
});