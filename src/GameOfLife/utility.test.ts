import Cell from './Cell';
import { mergeUniqueCells } from './utility';

describe('mergeUniqueCells', () => {
  it('merges two empty collections', () => {
    expect(mergeUniqueCells([], [])).toEqual([]);
  });

  it('merges a collection with another empty collection', () => {
    const left = [new Cell(0, 0)];

    expect(mergeUniqueCells(left, [])).toEqual(left);
  });

  it('merges two empty collections with distinct elements', () => {
    const leftCell = new Cell(0, 0);
    const rightCell = new Cell(0, 1);

    expect(mergeUniqueCells([leftCell], [rightCell])).toEqual([leftCell, rightCell]);
  });

  it('removes duplicates', () => {
    const cell1 = new Cell(0, 0);
    const cell2 = new Cell(0, 1);
    const cell3 = new Cell(1, 1);

    expect(mergeUniqueCells([cell1, cell2], [cell2, cell3])).toEqual([cell1, cell2, cell3]);
  });

});