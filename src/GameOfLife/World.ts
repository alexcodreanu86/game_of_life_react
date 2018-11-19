import Cell, { copyCell } from './Cell';
import { nextGenerationPopulation } from './nextGenerationRules';

class World {

  constructor(private cells: Cell[] = [], private nextGenPopulation: ((currentGen: Cell[]) => Cell[]) = nextGenerationPopulation) {}

  public isEmpty(): boolean {
    return this.cells.length === 0;
  }

  public addCell(cell: Cell): World {
    return new World(this.cells.concat([cell]), this.nextGenPopulation);
  }

  public tick(): World {
    this.cells = this.nextGenPopulation(this.cells);
    return this;
  }

  public getCells(): Cell[] {
    return this.cells.map(copyCell);
  }
}

export default World;