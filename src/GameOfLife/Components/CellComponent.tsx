import * as React from 'react';
import Cell from '../Cell';

interface CellComponentProps {
  cell: Cell;
  isAlive: boolean;
  onClick: (cell: Cell, isAlive: boolean) => void;
}

const CellComponent = (props: CellComponentProps) => {
  console.log(props.isAlive, props.cell);
  const liveStateClass = props.isAlive ? 'alive' : 'dead';
  return  (<>
    <div className={`cell ${liveStateClass}`}/>
  </>);
};

export {
  CellComponent,
  CellComponentProps
}