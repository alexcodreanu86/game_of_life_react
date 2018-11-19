import * as React from 'react';
import GameOfLifeSetup from './GameOfLifeSetup';

class GameOfLife extends React.Component {
  public render() {
    return (<>
      <GameOfLifeSetup onSetup={this.onSetup}/>
    </>)
  }

  public onSetup = () => {
    return true;
  }
}

export default GameOfLife;