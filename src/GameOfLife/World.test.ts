import Cell from './Cell';
import World from './World';

describe('World', () => {
  it('is empty on initialization', () => {
    const world = new World();

    expect(world.isEmpty()).toBe(true);
  });

  it('is not empty after adding a cell', () => {
    const world = new World()
      .addCell(new Cell(0, 0));

    expect(world.isEmpty()).toBe(false);
  });

  it('removes a live cell', () => {
    const world = new World()
      .addCell(new Cell(0, 0));

    const newWorld = world.removeCell(new Cell(0, 0));

    expect(newWorld.isEmpty()).toBe(true);
  });

  describe('on tick', () => {
    it('transitions to the next generation', () => {
      const nextGenPopulation = jest.fn((currentGen: Cell[]) => []);
      const cell = new Cell(0, 0);
      const worldSize = 10;
      const world = new World([], worldSize, nextGenPopulation)
        .addCell(cell)
        .tick();

      expect(nextGenPopulation).toHaveBeenLastCalledWith([cell], worldSize);
      expect(world.isEmpty()).toBe(true);
    });
  });

  describe('getCells', () => {
    it('returns a copy of all cells', () => {
      const cell = new Cell(0, 0);
      const cells = [cell];
      const world = new World(cells);

      const worldCells = world.getCells();

      worldCells[0].x = 1;

      expect(world.getCells()).toEqual([new Cell(0, 0)]);
    });
  });
});