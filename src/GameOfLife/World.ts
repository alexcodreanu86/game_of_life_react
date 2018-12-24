import { CellBehavior, CellState } from './Cell';
import { nextGenerationPopulation } from './nextGenerationRules';

class World {

  constructor(private cells: CellState[] = [], public size: number = 3, private nextGenPopulation: ((currentGen: CellState[], worldSize: number) => CellState[]) = nextGenerationPopulation) {}

  public isEmpty(): boolean {
    return this.cells.length === 0;
  }

  public addCell(cell: CellState): World {
    return new World(this.cells.concat([cell]), this.size, this.nextGenPopulation);
  }

  public removeCell(cell: CellState): World {
    const cells = this.cells.filter(worldCell => !CellBehavior.equals(worldCell, cell));
    return new World(cells, this.size, this.nextGenPopulation);
  }

  public tick(): World {
    this.cells = this.nextGenPopulation(this.cells, this.size);
    return this;
  }

  public getCells(): CellState[] {
    return this.cells.map(CellBehavior.copyCell);
  }
}

export default World;