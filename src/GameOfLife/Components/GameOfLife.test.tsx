import * as enzyme from 'enzyme';
import { ShallowWrapper } from 'enzyme';
import * as React from 'react';

import { CellBehavior } from '../Cell';
import GameOfLife from './GameOfLife';
import { GameOfLifeGrid } from './GameOfLifeGrid';
import GameOfLifeRunner from './GameOfLifeRunner';
import GameOfLifeSetup from './GameOfLifeSetup';

describe('GameOfLife', () => {
  describe('when initialized', () => {
    it('can be rendered', () => {
      enzyme.shallow(<GameOfLife />);
    });

    it('renders a config component', () => {
      const gameOfLife = enzyme.shallow(<GameOfLife/>);

      const gameConfig = gameOfLife.find(GameOfLifeSetup);

      expect(gameConfig.length).toBe(1);
      expect(gameConfig.prop("onSetup")).toEqual((gameOfLife.instance() as GameOfLife).onSetup);
    });

    it('the runner component is not rendered before setup is complete', () => {
      const gameOfLife = enzyme.shallow(<GameOfLife/>);

      const gameRunner = gameOfLife.find(GameOfLifeRunner);

      expect(gameRunner.length).toBe(0);
    });
  });

  describe('when setup is complete', () => {
    const cell1 = CellBehavior.new(1, 1);
    const cell2 = CellBehavior.new(2, 2);
    const cell3 = CellBehavior.new(3, 3);
    const worldCells = [cell1, cell2, cell3];
    const gofConfig = {
      worldCells,
      worldSize: 20
    };
    let gameOfLife: ShallowWrapper<React.Component["props"], React.Component["state"], React.Component>;
    let gameOfLifeComponent: GameOfLife;

    beforeEach(() => {
      gameOfLife = enzyme.shallow(<GameOfLife/>);
      const onSetup = gameOfLife.find(GameOfLifeSetup).prop('onSetup');
      onSetup(gofConfig);
      gameOfLifeComponent = (gameOfLife.instance() as GameOfLife);
    });

    it('sets the world properties', () => {
      expect(gameOfLifeComponent.state.gameOfLifeConfig).toEqual(gofConfig);
    });

    it('creates a new world', () => {
      expect(gameOfLifeComponent.state.world.getCells()).toEqual(worldCells);
      expect(gameOfLifeComponent.state.world.size).toEqual(20);
    });

    it('renders the world grid', () => {
      const grid = gameOfLife.find(GameOfLifeGrid);

      expect(grid.props().size).toEqual(20);
    });

    it('adds a cell when grid adds cell', () => {
      const grid = gameOfLife.find(GameOfLifeGrid);
      const newCell =  CellBehavior.new(19,19);
      grid.props().onAddCell(newCell);

      expect(gameOfLifeComponent.state.world.getCells()).toEqual(worldCells.concat([newCell]));
    });

    it('removes a cell when grid invokes the removal', () => {
      const grid = gameOfLife.find(GameOfLifeGrid);
      grid.props().onKillCell(cell1);

      const liveCells = gameOfLifeComponent.state.world.getCells();
      expect(liveCells).toEqual([cell2, cell3]);
    });
  });
});