const NEIGHBOR_DISTANCE = 1;

class Cell {
  constructor(public x: number, public y: number) {}

  public isNeighbor(other: Cell): boolean {
    const {x, y} = this;
    const neighborOnX = Math.abs(x - other.x) <= NEIGHBOR_DISTANCE;
    const neighborOnY = Math.abs(y - other.y) <= NEIGHBOR_DISTANCE;

    return neighborOnX &&
      neighborOnY &&
      !this.equals(other);
  }

  public equals(other: Cell) {
    return this.x === other.x &&
      this.y === other.y;
  }
}

const copyCell = (cell: Cell) => new Cell(cell.x, cell.y);

export { copyCell }
export default Cell;
