import * as enzyme from 'enzyme';
import * as React from 'react';

import { GameOfLifeConfig, GameOfLifeSetup } from './GameOfLifeSetup';

describe('GameOfLifeSetup', () => {
  const onChange = jest.fn((config: GameOfLifeConfig) => { return; });
  it('can be rendered', () => {
    const component = enzyme.shallow(<GameOfLifeSetup onChange={ onChange }/>);

    expect(component.html()).toContain('World size');
  });

  it('displays a world size field', () => {
    const component = enzyme.shallow(<GameOfLifeSetup onChange={ onChange }/>);

    expect(component.find('[name="worldSize"]').length).toBe(1);
  });

  it('updates world size on size change', () => {
    const component = enzyme.shallow(<GameOfLifeSetup onChange={ onChange }/>);

    expect(component.find('[name="worldSize"]').length).toEqual(1);
    component.find('[name="worldSize"]').simulate('change', { target: { value: "20" }});

    expect(onChange).toHaveBeenCalledWith({ worldSize: 20 });
  });
});