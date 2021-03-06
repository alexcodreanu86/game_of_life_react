import * as React from 'react';
import { CellBehavior, CellState } from '../Cell';
import { CellComponent } from './CellComponent';

interface GameOfLifeGridProps {
  size: number;
  liveCells: CellState[];
  onAddCell: (cell: CellState) => void;
  onKillCell: (cell: CellState) => void;
}

const GameOfLifeGrid = (props: GameOfLifeGridProps) => {
  const { size } = props;
  const boundary = size / 2;
  const cells = [];
  for(let y = boundary - 1; y >= -boundary; y--) {
    for(let x = -boundary; x < boundary; x++) {
      cells.push(CellBehavior.new(x, y));
    }
  }

  const clickedCell = (cell: CellState, isAlive: boolean) => {
    if(isAlive) {
      props.onKillCell(cell);
    } else {
      props.onAddCell(cell);
    }
  };

  const cellComponents = cells.map((cell, index) => {
    const isCellAlive = props.liveCells
      .filter(liveCell => CellBehavior.equals(liveCell, cell))
      .length > 0;
    return <CellComponent
      cell={cell}
      key={`cell${index}`}
      isAlive={isCellAlive}
      onClick={clickedCell}
    />;
  });

  return (
    <div className={`grid grid${size}`}>
      { cellComponents }
    </div>
  );
};

export {
  GameOfLifeGrid,
  GameOfLifeGridProps
};