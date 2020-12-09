import * as React from 'react';
import { CellState } from '../Cell';

interface CellComponentProps {
  cell: CellState;
  isAlive: boolean;
  onClick: (cell: CellState, isAlive: boolean) => void;
}

const CellComponent = React.memo((props: CellComponentProps) => {
  const liveStateClass = props.isAlive ? 'alive' : 'dead';
  // console.log('rendering cell component')
  const onClick = () => props.onClick(props.cell, props.isAlive);
  return  (<>
    <div className={`cell ${liveStateClass}`} onClick={onClick}/>
  </>);
});

export {
  CellComponent,
  CellComponentProps
}
