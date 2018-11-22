import * as enzyme from 'enzyme';
import * as React from 'react';
import GameOfLife from './GameOfLife';
import GameOfLifeRunner from './GameOfLifeRunner';
import GameOfLifeSetup from './GameOfLifeSetup';
import Cell from '../Cell';

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
    const gameOfLife = enzyme.shallow(<GameOfLife/>);
    const onSetup = gameOfLife.find(GameOfLifeSetup).prop('onSetup');
    const worldCells = [new Cell(1, 1), new Cell(2, 2), new Cell(3, 3)];


    const gofConfig = {
      worldCells,
      worldSize: 20
    };
    onSetup(gofConfig);
    const gameOfLifeComponent = (gameOfLife.instance() as GameOfLife);

    it('sets the world properties', () => {
      expect(gameOfLifeComponent.state.gameOfLifeConfig).toEqual(gofConfig);
    });

    it('creates a new world', () => {
      expect(gameOfLifeComponent.state.world.getCells()).toEqual(worldCells);
    });
  });
});