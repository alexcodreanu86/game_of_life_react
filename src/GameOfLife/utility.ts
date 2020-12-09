import { CellBehavior, CellState } from './Cell';

function mergeUniqueCells(left: CellState[], right: CellState[]): CellState[] {
  const rightUniqueCells = right.filter(rightCell => {
    return left.filter(leftCell => CellBehavior.equals(leftCell, rightCell)).length === 0;
  });
  return left.concat(rightUniqueCells);
}


type Handler<T, Y> = (t: T) => Y
const combine = <T, Y, X>(f1: Handler<T, Y>, f2: Handler<Y, X>): Handler<T, X> => {
  return (arg: T) => f2(f1(arg))
}

export { mergeUniqueCells, combine };
