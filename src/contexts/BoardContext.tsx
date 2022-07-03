
import { createContext, useContext, useEffect, useState } from 'react'


export const BoardContext = createContext({

    // States and Setter functionsHooks
    chessPieceArray: [],
    setChessPieceArray: (piece: any) => {

    },

    overlayArray: [],
    setOverlayArray: (overlay: any) => {

    },

    selectedPiece: {},
    setSelectedPiece: (piece: any) => {

    },

    currentPlayer: {},
    setCurrentPlayer: () => {

    },

    // Standlone Helper Functions
    hasPiece: (x: number, y: number): boolean | object => {
        return false;
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
        {
            name: "General",
            color: "black",
            x: 4,
            y: 0
        },
        {
            name: "Knight",
            color: "black",
            x: 7,
            y: 0
        },
        {
            name: "Knight",
            color: "red",
            x: 1,
            y: 9
        },
        {
            name: "Knight",
            color: "red",
            x: 7,
            y: 9
        },
    ]);


    const [overlayArray, setOverlayArray] = useState([
        // { x: 4, y: 0 },
    ]);

    const [selectedPiece, setSelectedPiece] = useState({});

    const [currentPlayer, setCurrentPlayer] = useState("red");

    // 判断是否有 piece 在这个点上
    const hasPiece = (x: number, y: number): boolean | object => {

        console.log("in hasPiece()");

        for (const item of chessPieceArray) {
            if (item.x === x && item.y === y) {
                return item;
            }
        }
        return false;
    }

    useEffect(() => {
        console.log("selectedPiece", selectedPiece);
    }, [selectedPiece])


    const value: any = {
        // hooks
        chessPieceArray, setChessPieceArray,
        overlayArray, setOverlayArray,
        selectedPiece, setSelectedPiece,
        currentPlayer,setCurrentPlayer,
        // function
        hasPiece
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