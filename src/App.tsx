import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";


import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend'
import WelcomePage from "./pages/WelcomePage"

import { BoardContextProvider } from './contexts/BoardContext'
import Board from './components/Board'


function App() {
  return (

    <div className="App">

      <DndProvider backend={HTML5Backend}>
        {/* <DndProvider backend={TouchBackend}> */}
        <BoardContextProvider>

          <BrowserRouter>

            <Routes>

              <Route path="/" element={<WelcomePage />} />
              <Route path="/board/:mode" element={<Board />} />
            </Routes>
 
          </BrowserRouter >
    
        </BoardContextProvider>
        {/* </DndProvider> */}
      </DndProvider>
    </div>

  );
}

export default App;
