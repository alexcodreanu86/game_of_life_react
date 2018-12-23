import * as React from 'react';
import World from '../World';
import GameOfLifeSetup, { GameOfLifeConfig } from './GameOfLifeSetup';

import Cell from '../Cell';
import './GameOfLife.css';
import { GameOfLifeGrid } from './GameOfLifeGrid';

interface GameOfLifeState {
  world: World;
  gameOfLifeConfig?: GameOfLifeConfig
  isGameComplete: boolean
}

const defaultState = {
  isGameComplete: false,
  world: new World(),
};

class GameOfLife extends React.Component<any, GameOfLifeState> {
  constructor(props: any, state: GameOfLifeState) {
    super(props, state);
    this.state = defaultState;
  }

  public render() {
    return (<>
      { !this.state.gameOfLifeConfig && <GameOfLifeSetup onSetup={this.onSetup}/>}
      {this.state.gameOfLifeConfig && <>
        <p>{JSON.stringify(this.state.gameOfLifeConfig)}</p>
        <GameOfLifeGrid
          size={this.state.gameOfLifeConfig.worldSize}
          liveCells={this.state.world.getCells()}
          onAddCell={this.onAddCell}
          onKillCell={this.onKillCell}/>
      </>}

      <div className="grid grid5">

        <div className="item alive"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item alive"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item alive"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item alive"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item alive"/>
        <div className="item dead"/>
        <div className="item dead"/>
        <div className="item dead"/>
      </div>
    </>)
  }

  public onSetup = (gameOfLifeConfig: GameOfLifeConfig) => {
    const world = gameOfLifeConfig.worldCells.reduce(
      (buildingWorld, cell) => buildingWorld.addCell(cell),
      new World([], gameOfLifeConfig.worldSize)
    );

    this.setState({ ...this.state, gameOfLifeConfig, world})
  };

  private onAddCell = (cell: Cell) => {
    const newWorld = this.state.world.addCell(cell);
    this.setState({...this.state, world: newWorld });
  };


  private onKillCell = (cell: Cell) => {
    const newWorld = this.state.world.removeCell(cell);
    this.setState({...this.state, world: newWorld });
  }
}

export default GameOfLife;