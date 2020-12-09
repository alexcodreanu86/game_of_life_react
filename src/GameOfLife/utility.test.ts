import { combine, mergeUniqueCells } from './utility';

describe('mergeUniqueCells', () => {
  it('merges two empty collections', () => {
    expect(mergeUniqueCells([], [])).toEqual([]);
  });

  it('merges a collection with another empty collection', () => {
    const left = [{ x: 0, y: 0 }];

    expect(mergeUniqueCells(left, [])).toEqual(left);
  });

  it('merges two empty collections with distinct elements', () => {
    const leftCell = { x: 0, y: 0 };
    const rightCell = { x: 0, y: 1 };

    expect(mergeUniqueCells([leftCell], [rightCell])).toEqual([leftCell, rightCell]);
  });

  it('removes duplicates', () => {
    const cell1 = { x: 0, y: 0 };
    const cell2 = { x: 0, y: 1 };
    const cell3 = { x: 1, y: 1 };

    expect(mergeUniqueCells([cell1, cell2], [cell2, cell3])).toEqual([cell1, cell2, cell3]);
  });
});

describe('combine', () => {
  it('combines two functions', () => {
    const trim = (arg: string) => arg.trim()
    const length = (arg: string) => arg.length

    const trimAndLength = combine(trim, length)

    expect(trimAndLength("  123  ")).toEqual(3)
    expect(trimAndLength("  a 123 ")).toEqual(5)
  })
})
