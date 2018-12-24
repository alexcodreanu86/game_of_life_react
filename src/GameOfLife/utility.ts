import { CellBehavior, CellState } from './Cell';

function mergeUniqueCells(left: CellState[], right: CellState[]): CellState[] {
  const rightUniqueCells = right.filter(rightCell => {
    return left.filter(leftCell => CellBehavior.equals(leftCell, rightCell)).length === 0;
  });
  return left.concat(rightUniqueCells);
}

export { mergeUniqueCells };