import * as React from 'react';
import World from '../World';
import GameOfLifeSetup, { GameOfLifeConfig } from './GameOfLifeSetup';

interface GameOfLifeState {
  world: World;
  gameOfLifeConfig?: GameOfLifeConfig
}

class GameOfLife extends React.Component<any, GameOfLifeState> {
  constructor(props: any, state: GameOfLifeState) {
    super(props, state);
    const world = new World();
    this.state = { world, gameOfLifeConfig: undefined };
  }

  public render() {
    return (<>
      <GameOfLifeSetup onSetup={this.onSetup}/>
      (this.state.gameOfLifeConfig && <p>{this.state.gameOfLifeConfig}</p>)
    </>)
  }

  public onSetup = (gameOfLifeConfig: GameOfLifeConfig) => {
    const world = gameOfLifeConfig.worldCells.reduce(
      (buildingWorld, cell) => buildingWorld.addCell(cell),
      new World()
    );

    this.setState({ ...this.state, gameOfLifeConfig, world})
  }
}

export default GameOfLife;