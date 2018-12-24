const NEIGHBOR_DISTANCE = 1;

interface CellState {
  x: number;
  y: number;
}

const CellBehavior = {
  copyCell: (cell: CellState) => CellBehavior.new(cell.x, cell.y),
  equals: (cell: CellState, other: CellState) => {
    return cell.x === other.x &&
      cell.y === other.y;
  },

  isNeighbor: (cell: CellState, other: CellState) => {
    const {x, y} = cell;
    const neighborOnX = Math.abs(x - other.x) <= NEIGHBOR_DISTANCE;
    const neighborOnY = Math.abs(y - other.y) <= NEIGHBOR_DISTANCE;

    return neighborOnX &&
      neighborOnY &&
      !CellBehavior.equals(cell, other);
  },

  new: (x: number, y: number) => ({ x, y })
};

export { CellState, CellBehavior };
