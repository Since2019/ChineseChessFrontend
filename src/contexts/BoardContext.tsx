
import { createContext, useContext, useEffect, useState } from 'react'
import {chessPieceArray2FenString} from "../utils/fenNotation"

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
    },

    hasFriendlyPiece: (x: number, y: number, color: string): boolean => {
        return false
    }


});


export function useBoardContext() {

    return useContext(BoardContext);

}







export function BoardContextProvider({ children }: any) {



    const [chessPieceArray, setChessPieceArray] = useState([


        {
            name: "General",
            color: "black",
            x: 4,
            y: 0
        },
        {
            name: "General",
            color: "red",
            x: 4,
            y: 9
        },
        {
            name: "Bishop",
            color: "black",
            x: 2,
            y: 0
        },
        {
            name: "Bishop",
            color: "black",
            x: 6,
            y: 0
        },
        {
            name: "Bishop",
            color: "red",
            x: 2,
            y: 9
        },
        {
            name: "Bishop",
            color: "red",
            x: 6,
            y: 9
        },
        {
            name: "Knight",
            color: "black",
            x: 1,
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
        {
            name: "Advisor",
            color: "black",
            x: 3,
            y: 0
        },
        {
            name: "Advisor",
            color: "black",
            x: 5,
            y: 0
        },
        {
            name: "Advisor",
            color: "red",
            x: 3,
            y: 9
        },
        {
            name: "Advisor",
            color: "red",
            x: 5,
            y: 9
        },
        {
            name: "Rook",

            color: "red",
            x: 0,
            y: 9
        },
        {
            name: "Rook",
            color: "red",
            x: 8,
            y: 9
        },
        {
            name: "Rook",
            color: "black",
            x: 0,
            y: 0
        },
        {
            name: "Rook",
            color: "black",
            x: 8,
            y: 0

        },

        {
            name : "Pawn",
            color : "black",
            x : 0, 
            y : 3
        },
        {
            name : "Pawn",
            color : "black",
            x : 2, 
            y : 3
        },
        {
            name : "Pawn",
            color : "black",
            x : 4, 
            y : 3
        },
        {
            name : "Pawn",
            color : "black",
            x : 6, 
            y : 3
        },
        {
            name : "Pawn",
            color : "black",
            x : 8, 
            y : 3
        },
        {
            name : "Pawn",
            color : "red",
            x : 0, 
            y : 6
        },
        {
            name : "Pawn",
            color : "red",
            x : 2, 
            y : 6
        },
        {
            name : "Pawn",
            color : "red",
            x : 4, 
            y : 6
        },
        {
            name : "Pawn",
            color : "red",
            x : 6, 
            y : 6
        },
        {
            name : "Pawn",
            color : "red",
            x : 8, 
            y : 6
        }
    ]);


    const [overlayArray, setOverlayArray] = useState([
        // { x: 4, y: 0 },
    ]);

    const [selectedPiece, setSelectedPiece] = useState({});

    const [currentPlayer, setCurrentPlayer] = useState("red");

    // 判断是否有 piece 在这个点上
    const hasPiece = (x: number, y: number): boolean | object => {

        for (const item of chessPieceArray) {
            if (item.x === x && item.y === y) {
                return item;
            }
        }
        return false;
    }



    // 判断该点上面是否为己方棋子
    const hasFriendlyPiece = (x: number, y: number, color: string): boolean => {

        console.log("in hasFriendlyPiece()");

        for (const item of chessPieceArray) {
 
            if (item.x === x && item.y === y) {
 
                if (item.color === color) {
                    return true;
                }
            }
        }
        return false;
    }
 

    useEffect(() => {
        // console.log("chessPieceArray", chessPieceArray);
        chessPieceArray2FenString(chessPieceArray);
    }, [chessPieceArray])


    const value: any = {
        // hooks
        chessPieceArray, setChessPieceArray,
        overlayArray, setOverlayArray,
        selectedPiece, setSelectedPiece,
        currentPlayer, setCurrentPlayer,
        // function
        hasPiece,
        hasFriendlyPiece
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