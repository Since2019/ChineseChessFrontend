import React from 'react';
import './App.css';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend'


import { BoardContextProvider } from './contexts/BoardContext'
import Board from './components/Board'


function App() {
  return (

    <div className="App">
      <DndProvider backend={HTML5Backend}>
        {/* <DndProvider backend={TouchBackend}> */}
          <BoardContextProvider>
            <Board />
          </BoardContextProvider>
        {/* </DndProvider> */}
      </DndProvider>
    </div>

  );
}

export default App;
