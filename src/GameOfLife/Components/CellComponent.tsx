import * as React from 'react';
import { CellState } from '../Cell';

interface CellComponentProps {
  cell: CellState;
  isAlive: boolean;
  onClick: (cell: CellState, isAlive: boolean) => void;
}

const CellComponent = (props: CellComponentProps) => {
  const liveStateClass = props.isAlive ? 'alive' : 'dead';
  const onClick = () => props.onClick(props.cell, props.isAlive);
  return  (<>
    <div className={`cell ${liveStateClass}`} onClick={onClick}/>
  </>);
};

export {
  CellComponent,
  CellComponentProps
}