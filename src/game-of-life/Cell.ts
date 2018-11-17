class Cell {
  constructor(public x: number, public y: number) {}

  public isNeighbor(other: Cell): boolean {
    return !(this.x === other.x && this.y === other.y)
  }
}

export default Cell
