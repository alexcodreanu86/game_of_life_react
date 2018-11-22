import * as enzyme from 'enzyme';
import * as React from 'react';
import GameOfLifeSetup, { GameOfLifeConfig } from './GameOfLifeSetup';
import Cell from '../Cell';

describe('GameOfLifeSetup', () => {
  const onSetup = jest.fn((config: GameOfLifeConfig) => { return; });
  it('can be rendered', () => {
    const component = enzyme.shallow(<GameOfLifeSetup onSetup={ onSetup }/>);

    expect(component.html()).toContain('World size');
  });

  it('displays a form for world size', () => {
    const component = enzyme.shallow(<GameOfLifeSetup onSetup={ onSetup }/>);

    expect(component.find('form').length).toBe(1);
  });

  it('updates world size on size change', () => {
    const component = enzyme.shallow<GameOfLifeSetup>(<GameOfLifeSetup onSetup={ onSetup }/>);
    const gameOfLifeSetup = component.instance();

    expect(component.find('[name="worldSize"]').length).toEqual(1);
    component.find('[name="worldSize"]').simulate('change', { currentTarget: { value: "20", valueAsNumber: 20}});

    expect(gameOfLifeSetup.state.worldSize).toEqual(20);
  });

  it('can add live cells', () => {
    const component = enzyme.shallow<GameOfLifeSetup>(<GameOfLifeSetup onSetup={ onSetup }/>);
    const inputValue = "(0,0), (1,1)";

    const worldCells = component.find('[name="worldCells"]');
    worldCells.simulate('change', { currentTarget: { value: inputValue }});

    const gameOfLifeSetup = component.instance();
    expect(gameOfLifeSetup.state.worldCellsInput).toEqual(inputValue);
  });

  it('on submit creates a new world', () => {
    const component = enzyme.shallow<GameOfLifeSetup>(<GameOfLifeSetup onSetup={ onSetup }/>);
    const newState = { worldSize: 12, worldCellsInput: "(1,1), (3,4)"};
    component.setState(newState);
    const stopPropagation = jest.fn();
    const preventDefault = jest.fn();
    component.find('form').simulate('submit', {stopPropagation, preventDefault});

    expect(stopPropagation).toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
    expect(onSetup).toHaveBeenCalledWith({ worldSize: 12, worldCells: [new Cell(1, 1), new Cell(3, 4)] });
  });


});