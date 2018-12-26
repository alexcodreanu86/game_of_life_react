import * as React from 'react';
import { WorldBehavior, WorldState } from '../World';
import { GameOfLifeConfig, GameOfLifeSetup } from './GameOfLifeSetup';

import { CellBehavior, CellState } from '../Cell';
import './GameOfLife.css';
import { GameOfLifeGrid } from './GameOfLifeGrid';

interface GameOfLifeState {
  world: WorldState;
  gameOfLifeConfig?: GameOfLifeConfig
  isGameComplete: boolean
}

const defaultState = {
  isGameComplete: false,
  world: WorldBehavior.addCell(WorldBehavior.new(), CellBehavior.new(0, 0))
};

class GameOfLife extends React.Component<any, GameOfLifeState> {
  constructor(props: any, state: GameOfLifeState) {
    super(props, state);
    this.state = defaultState;
  }

  public render() {
    return (<>
      <GameOfLifeSetup onChange={this.onChange}/>

      {this.state.gameOfLifeConfig && <>
        <button onClick={this.tick}>Tick</button>
        <GameOfLifeGrid
          size={this.state.gameOfLifeConfig.worldSize}
          liveCells={this.state.world.cells}
          onAddCell={this.onAddCell}
          onKillCell={this.onKillCell}/>
      </>
      }
    </>)
  }

  public tick = () => {
    const world =  WorldBehavior.tick(this.state.world);
    this.setState({...this.state, world });
  };

  public onChange = (gameOfLifeConfig: GameOfLifeConfig) => {
    const world = WorldBehavior.new(this.state.world.cells, gameOfLifeConfig.worldSize);

    this.setState({ ...this.state, gameOfLifeConfig, world})
  };

  private onAddCell = (cell: CellState) => {
    const world = WorldBehavior.addCell(this.state.world, cell);
    this.setState({...this.state, world });
  };

  private onKillCell = (cell: CellState) => {
    const world = WorldBehavior.removeCell(this.state.world, cell);
    this.setState({...this.state, world });
  }
}

export default GameOfLife;