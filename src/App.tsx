import React from 'react';
import './App.css';

import { BoardContextProvider } from './contexts/BoardContext'
import Board from './components/Board'

function App() {
  return (

    <div className="App">
      <BoardContextProvider>
        <Board />
      </BoardContextProvider>
    </div>

  );
}

export default App;
