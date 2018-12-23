import * as React from 'react';
import Cell from '../Cell';
import { CellComponent } from './CellComponent';

interface GameOfLifeGridProps {
  size: number;
  liveCells: Cell[];
  onAddCell: (cell: Cell) => void;
  onKillCell: (cell: Cell) => void;
}

const GameOfLifeGrid = (props: GameOfLifeGridProps) => {
  const { size } = props;
  const boundary = size / 2;
  const cells = [];
  for(let x = -boundary; x < boundary; x++) {
    for(let y = -boundary; y < boundary; y++) {
      cells.push(new Cell(x, y));
    }
  }

  const clickedCell = (cell: Cell, isAlive: boolean) => {
    if(isAlive) {
      props.onKillCell(cell);
    } else {
      props.onAddCell(cell);
    }
  };

  const cellComponents = cells.map((cell, index) => {
    const isCellAlive = props.liveCells
      .filter(liveCell => liveCell.equals(cell))
      .length > 0;
    return <CellComponent
      cell={cell}
      key={`cell${index}`}
      isAlive={isCellAlive}
      onClick={clickedCell}
    />;
  });

  return (
    <div className={`grid${size}`}>
      { cellComponents }
    </div>
  );
};

export {
  GameOfLifeGrid,
  GameOfLifeGridProps
};