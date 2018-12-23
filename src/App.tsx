import * as React from 'react';

import GameOfLife from './GameOfLife/Components/GameOfLife';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <GameOfLife/>
      </div>
    );
  }
}

export default App;
