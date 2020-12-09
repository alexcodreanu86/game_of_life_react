import * as React from 'react';
import { useEffect, useState } from 'react';
import { CellBehavior, CellState } from '../Cell';
import { CellComponent } from './CellComponent';

interface GameOfLifeGridProps {
  size: number;
  liveCells: CellState[];
  onAddCell: (cell: CellState) => void;
  onKillCell: (cell: CellState) => void;
}

const GameOfLifeGrid = (props: GameOfLifeGridProps) => {
  const { onKillCell, onAddCell } = props
  const { size } = props;
  const [cells, setCells] = useState<CellState[]>([])

  useEffect(() => {
    const boundary = size / 2;
    const tempCells = []
    for(let y = boundary - 1; y >= -boundary; y--) {
      for(let x = -boundary; x < boundary; x++) {
        tempCells.push(CellBehavior.new(x, y));
      }
    }
    setCells(tempCells)
  }, [size])


  const clickedCell = React.useCallback((cell: CellState, isAlive: boolean) => {
    if(isAlive) {
      onKillCell(cell);
    } else {
      onAddCell(cell);
    }
  }, [onKillCell, onAddCell]);

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
