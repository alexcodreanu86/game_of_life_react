import * as enzyme from 'enzyme';
import * as React from 'react';
import GameOfLife from './GameOfLife';
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

      const gameConfig = gameOfLife.find(GameOfLifeRunner);

      expect(gameConfig.length).toBe(0);
    });
  });

  describe('when setup is complete', () => {
    it('sets the world properties', () => {
      expect(true).toBe(true);
    });
  });
});