import Cell from './Cell';

function mergeUniqueCells(left: Cell[], right: Cell[]): Cell[] {
  const rightUniqueCells = right.filter(rightCell => {
    return left.filter(leftCell => leftCell.equals(rightCell)).length === 0;
  });
  return left.concat(rightUniqueCells);
}

export { mergeUniqueCells };