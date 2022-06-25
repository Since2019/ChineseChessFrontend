
import { createContext, useContext, useEffect, useState } from 'react'


export const BoardContext = createContext({
    chessPieceArray: [],
    setChessPieceArray: (piece: any) => {

    },
    
    overlayArray: [],
    setOverlayArray: (overlay: any) => {

    }


});


export function useBoardContext() {

    return useContext(BoardContext);

}



export function BoardContextProvider({ children }: any) {

    const [chessPieceArray, setChessPieceArray] = useState([
        {
            name: "Knight",
            color: "black",
            x: 1,
            y: 0
        },
        // {
        //   name: "Bishop",
        //   color : "red",
        //   x: 2,
        //   y: 0
        // },
        {
            name: "General",
            color: "black",
            x: 4,
            y: 0
        }
    ]);


    const [overlayArray, setOverlayArray] = useState([]);




    const value: any = {
        chessPieceArray, setChessPieceArray,
        overlayArray, setOverlayArray
    };

    return (
        <BoardContext.Provider value={value} >
            {children}
        </BoardContext.Provider>
    );

}


export function BoardContextConsumer({ children }: any) {
    return (
        <BoardContext.Consumer>
            {children}
        </BoardContext.Consumer>
    )
}