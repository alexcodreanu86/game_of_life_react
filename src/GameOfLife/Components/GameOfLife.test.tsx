import * as enzyme from 'enzyme';
import * as React from 'react';

import GameOfLife from './GameOfLife';

describe('GameOfLife', () => {
  describe('when initialized', () => {
    it('can be rendered', () => {
      enzyme.mount(<GameOfLife />);
    });
  });
});
