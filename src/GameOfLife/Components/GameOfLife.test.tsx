import * as enzyme from 'enzyme';
import { ShallowWrapper } from 'enzyme';
import * as React from 'react';

import { CellBehavior } from '../Cell';
import GameOfLife from './GameOfLife';
import { GameOfLifeGrid } from './GameOfLifeGrid';
import GameOfLifeRunner from './GameOfLifeRunner';
import { GameOfLifeSetup } from './GameOfLifeSetup';

describe('GameOfLife', () => {
  describe('when initialized', () => {
    it('can be rendered', () => {
      enzyme.shallow(<GameOfLife />);
    });

    it('renders a config component', () => {
      const gameOfLife = enzyme.shallow(<GameOfLife/>);

      const gameConfig = gameOfLife.find(GameOfLifeSetup);

      expect(gameConfig.length).toBe(1);
      expect(gameConfig.prop("onChange")).toEqual((gameOfLife.instance() as GameOfLife).onChange);
    });

    it('the runner component is not rendered before setup is complete', () => {
      const gameOfLife = enzyme.shallow(<GameOfLife/>);

      const gameRunner = gameOfLife.find(GameOfLifeRunner);

      expect(gameRunner.length).toBe(0);
    });
  });

  describe('when setup is complete', () => {
    const initialCell = CellBehavior.new(0, 0);
    const cell1 = CellBehavior.new(1, 1);
    const gofConfig = {
      worldSize: 20
    };
    let gameOfLife: ShallowWrapper<React.Component["props"], React.Component["state"], React.Component>;
    let gameOfLifeComponent: GameOfLife;

    beforeEach(() => {
      gameOfLife = enzyme.shallow(<GameOfLife/>);
      const onChange = gameOfLife.find(GameOfLifeSetup).prop('onChange');
      onChange(gofConfig);
      gameOfLifeComponent = (gameOfLife.instance() as GameOfLife);
    });

    it('sets the world properties', () => {
      expect(gameOfLifeComponent.state.gameOfLifeConfig).toEqual(gofConfig);
    });

    it('creates a new world', () => {
      expect(gameOfLifeComponent.state.world.size).toEqual(20);
    });

    it('renders the world grid', () => {
      const grid = gameOfLife.find(GameOfLifeGrid);

      expect(grid.props().size).toEqual(20);
      expect(gameOfLifeComponent.state.world.cells).toEqual([initialCell]);
    });

    it('adds a cell when grid adds cell', () => {
      const grid = gameOfLife.find(GameOfLifeGrid);
      grid.props().onAddCell(cell1);

      expect(gameOfLifeComponent.state.world.cells).toEqual([initialCell, cell1]);
    });

    it('removes a cell when grid invokes the removal', () => {
      const grid = gameOfLife.find(GameOfLifeGrid);
      grid.props().onAddCell(cell1);
      grid.props().onKillCell(cell1);

      const liveCells = gameOfLifeComponent.state.world.cells;
      expect(liveCells).toEqual([initialCell]);
    });
  });
});