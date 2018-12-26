import { CellBehavior, CellState } from './Cell';
import { WorldBehavior, WorldBehaviorFactory } from './World';

describe('World', () => {
  it('is empty on initialization', () => {
    const world = WorldBehavior.new();

    expect(WorldBehavior.isEmpty(world)).toBe(true);
  });

  it('is not empty after adding a cell', () => {
    const world =
      WorldBehavior.addCell(
        WorldBehavior.new(),
        CellBehavior.new(0, 0)
      );

    expect(WorldBehavior.isEmpty(world)).toBe(false);
  });

  it('removes a live cell', () => {
    const world =
      WorldBehavior.addCell(
        WorldBehavior.new(),
        CellBehavior.new(0, 0)
      );

    const newWorld = WorldBehavior.removeCell(world, CellBehavior.new(0, 0));

    expect(WorldBehavior.isEmpty(newWorld)).toBe(true);
  });

  describe('on tick', () => {
    it('transitions to the next generation', () => {
      const nextGenPopulation = jest.fn((currentGen: CellState[]) => []);
      const cell = CellBehavior.new(0, 0);
      const worldSize = 10;
      const testWorldBehavior = WorldBehaviorFactory(nextGenPopulation);
      const world =
        testWorldBehavior.addCell(
          testWorldBehavior.new([], worldSize),
          cell
        );

      const newWorld = testWorldBehavior.tick(world);

      expect(nextGenPopulation).toHaveBeenLastCalledWith([cell], worldSize);
      expect(testWorldBehavior.isEmpty(newWorld)).toBe(true);
    });
  });
});