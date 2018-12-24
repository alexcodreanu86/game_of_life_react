import * as React from 'react';
import { CellBehavior, CellState } from '../Cell';

interface GameOfLifeConfig {
  worldSize: number;
  worldCells: CellState[];
}

interface GameOfLifeSetupState {
  worldSize: number;
  worldCellsInput: string;
}

interface GameOfLifeSetupProps {
  onSetup: (config: GameOfLifeConfig) => void;
}

const defaultState = {
  worldCellsInput: "(0, 0)",
  worldSize: 4
};

class GameOfLifeSetup extends React.Component<GameOfLifeSetupProps, GameOfLifeSetupState> {
  constructor(props: GameOfLifeSetupProps, state: GameOfLifeConfig) {
    super(props, state);
    this.state = defaultState;
  }

  public render() {
    return <div>
      <form onSubmit={this.onSubmit}>
        <div>
          <label>World size (5-100):</label>
          <input name="worldSize" type="number" max={101} min={4} value={this.state.worldSize} onChange={this.onSizeChange}/>
        </div>
        <div>
          <label>World Cells comma separated tuples of coordinates [i.e. (0, 0), (1,1)]</label>
          <input name="worldCells" pattern="((\(\d\s*,\s*\d\)\s*)|,\s*)+"  type="text" value={this.state.worldCellsInput} onChange={this.onWorldCellsChange}/>
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
    const worldCellsInput = !!inputField.value ? inputField.value : this.state.worldCellsInput;
    this.setState({ ...this.state, worldCellsInput })
  };

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const worldCells = this.generateWorldCells(this.state.worldCellsInput);
    const { worldSize } = this.state;
    this.props.onSetup({ worldCells, worldSize });
  };

  private generateWorldCells(worldCellsInput: string): CellState[] {
    return worldCellsInput
      .split(/,(?=\s*\()/)
      .map(coords =>
        coords
          .trim()
          .replace(/\(/, '')
          .replace(/\)/, '')
          .split(',')
          .map(digit => parseInt(digit, 10))
      )
      .map(coords => CellBehavior.new(coords[0], coords[1]));
  }
}

export default GameOfLifeSetup;
export { GameOfLifeConfig, GameOfLifeSetupProps };