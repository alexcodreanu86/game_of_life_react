import * as React from 'react';

interface GameOfLifeConfig {
  worldSize: number;
  worldCells : string;
}

interface GameOfLifeSetupProps {
  onSetup: (config: GameOfLifeConfig) => void;
}

const defaultState = {
  worldCells: "(0, 0)",
  worldSize: 5
};

class GameOfLifeSetup extends React.Component<GameOfLifeSetupProps, GameOfLifeConfig> {
  constructor(props: GameOfLifeSetupProps, state: GameOfLifeConfig) {
    super(props, state);
    this.state = defaultState;
  }

  public render() {
    return <div>
      <form onSubmit={this.onSubmit}>
        <div>
          <label>World size (5-100):</label>
          <input name="worldSize" type="number" max={100} min={5} value={this.state.worldSize} onChange={this.onSizeChange}/>
        </div>
        <div>
          <label>World Cells comma separated tuples of coordinates [i.e. (0, 0), (1,1)]</label>
          <input name="worldCells" pattern="((\(\d\s*,\s*\d\)\s*)|,\s*)+"  type="text" value={this.state.worldCells} onChange={this.onWorldCellsChange}/>
        </div>
        <div>
          <input type="submit" value="Setup World"/>
        </div>
      </form>
    </div>;
  }

  private onSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputField = event.currentTarget;
    const worldSize = !!inputField.value ? inputField.valueAsNumber : this.state.worldSize;
    this.setState({ ...this.state, worldSize })
  };

  private onWorldCellsChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputField = event.currentTarget;
    const worldCells = !!inputField.value ? inputField.value : this.state.worldCells;
    this.setState({ ...this.state, worldCells })
  };

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    this.props.onSetup(this.state);
  }
}

export default GameOfLifeSetup;
export { GameOfLifeConfig, GameOfLifeSetupProps };