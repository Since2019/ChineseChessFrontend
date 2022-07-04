
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



    // 判断该点上面是否为己方棋子
    const hasFriendlyPiece = (x: number, y: number, color: string): boolean => {

        console.log("in hasFriendlyPiece()");

        for (const item of chessPieceArray) {
            console.log("x,y,color");
            console.log(x, y, color);
            if (item.x === x && item.y === y) {
                console.log("color, item.color");
                console.log(item.color);
                console.log(color);
                if (item.color === color) {
                    return true;
                }
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