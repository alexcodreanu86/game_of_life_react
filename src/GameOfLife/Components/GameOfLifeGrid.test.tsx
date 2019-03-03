import * as enzyme from 'enzyme';
import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { CellBehavior, CellState } from '../Cell';
import { CellComponent } from './CellComponent';
import { GameOfLifeGrid } from './GameOfLifeGrid';

describe('GameOfLifeGrid', () => {
  const onAddCell = jest.fn((_: CellState) => undefined);
  const onKillCell = jest.fn((_: CellState) => undefined);
  const size = 4;
  describe('with no live cells', () => {
    const liveCells: CellState[] = [];

    const gridProps = {
      liveCells, onAddCell, onKillCell, size
    };

    const grid = enzyme.shallow(<GameOfLifeGrid {...gridProps} />);
    it('contains grid element', () => {
      const gridElement = grid.find('.grid4');
      expect(gridElement.length).toEqual(1);
    });

    it('renders a grid of 4x4', () => {
      const cells = grid.find(CellComponent);
      expect(cells.length).toEqual(16);
    });

    it('all cells are dead', () => {
      const cells = grid.find(CellComponent);
      const aliveCells = cells.filter((cell: ShallowWrapper) =>
        cell.prop('isAlive'));

      expect(aliveCells.length).toEqual(0);
    });
  });

  describe('with live cells', () => {
    const liveCell = CellBehavior.new(0, 0);
    const liveCells = [liveCell];
    const gridProps = {
      liveCells, onAddCell, onKillCell, size
    };
    const grid = enzyme.shallow(<GameOfLifeGrid {...gridProps}/>);

    it('renders live cells too', () => {
      const cells = grid.find(CellComponent);
      const renderedLiveCells = cells
        .getElements()
        .filter(node => node.props.isAlive);

      expect(renderedLiveCells.length).toEqual(1);
      expect(renderedLiveCells[0].props.cell).toEqual(liveCell)
    });
  });

  describe('when clicking a cell', () => {
    const liveCells: CellState[] = [];
    const gridProps = { liveCells, onAddCell, onKillCell, size };

    const grid = enzyme.shallow(<GameOfLifeGrid {...gridProps} />);
    it('executes onAddCell when cell is dead', () => {
      const cellComponent = grid.find(CellComponent)
        .getElements()[0];

      const isAlive = false;
      cellComponent.props.onClick(cellComponent.props.cell, isAlive);

      expect(onAddCell).toHaveBeenCalledWith(cellComponent.props.cell);
    });

    it('executes onKillCell when cell is alive', () => {
      const cellComponent = grid.find(CellComponent)
        .getElements()[0];

      const isAlive = true;
      cellComponent.props.onClick(cellComponent.props.cell, isAlive);

      expect(onKillCell).toHaveBeenCalledWith(cellComponent.props.cell);
    });
  });
});