import * as React from 'react';
import { ChangeEvent } from 'react';

interface GameOfLifeConfig {
  worldSize: number;
}

interface GameOfLifeSetupProps {
  onChange: (config: GameOfLifeConfig) => void;
}

const GameOfLifeSetup = (props: GameOfLifeSetupProps) => {
  return <div>
    <div>
      <label>World size (5-50):</label>
      <select name="worldSize" defaultValue="4" onChange={onSizeChange(props)}>
        <option value="4">4</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>;
};

const onSizeChange = (props: GameOfLifeSetupProps) => {
  return (event: ChangeEvent<HTMLSelectElement>) => {
    const worldSize = parseInt(event.target.value, 10);
    props.onChange({ worldSize });
  };
};

export { GameOfLifeSetup, GameOfLifeConfig, GameOfLifeSetupProps };
