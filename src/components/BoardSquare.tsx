import React, { useEffect } from 'react'

import styled from 'styled-components'

import { useDrop } from "react-dnd";

import { ItemTypes } from "../constants/ItemTypes";

import { useBoardContext } from "../contexts/BoardContext";

// Styled Components
const Grid = styled.div`
    width : 90px;
    height : 90px;
    background-color : ;
    position: relative;
`;





// 格子将会存放棋子
export default function BoardSquare({ className, children, x, y }: any) {

  // TODO: 在这里读取context里面的array，看看格子是否在这个array里
  const { overlayArray, selectedPiece,
    chessPieceArray, setChessPieceArray,
    currentPlayer, setCurrentPlayer

  }: any = useBoardContext();

  const dropPiece = (piece: any) => {
    console.log("in dropPiece");
    let newChessPieceArray = [...chessPieceArray];
    let newNewChessPieceArray = newChessPieceArray.filter((chessPiece: any) => (
      (chessPiece.x !== piece.x) || (chessPiece.y !== piece.y)
    )
    );

    console.log("newChessPieceArray", newNewChessPieceArray);
    setChessPieceArray(newNewChessPieceArray);
  }

  useEffect(() => {
    console.log("currentPlayer is:", currentPlayer);
  }, [currentPlayer])

  const [{ isOver, canDrop }, drop] = useDrop(
    {
      accept: ItemTypes.KNIGHT,
      canDrop: (item: any, monitor: any): any => { // item 是 useDrag 里面的 item 


        // console.log("canDrop?")
        // console.log("item", item);
        // console.log("monitor", monitor);
        // console.log("overlayArray", overlayArray)


        // TODO: comment out to let piece move without keeping track of taking turns.
        if (currentPlayer !== item.color) {
            return false;              
        }

        for (let itm of overlayArray) {
          console.log("itm", itm);
          console.log("itm.x", itm.x);
          console.log("itm.y", itm.y);

          if (itm.x === x && itm.y === y) {
            return true; 
          }

        }
        console.log("before false")

        return false;     // TODO: Change to 'true' to allow moving every where                        
      },
      // React-DND's drop listener
      drop: (e, s) => {

        let newChessPieceArray = [...chessPieceArray]
        for (let item of chessPieceArray) {
          // console.log(" item of chessPieceArray",item);
          // console.log(" selectedPiece",selectedPiece);

          // 
          if (item.x === selectedPiece.x && item.y === selectedPiece.y) {
            console.log("item===selectedPiece", item, selectedPiece)
            console.log("index of selectedPiece", chessPieceArray.indexOf(item));
            newChessPieceArray[chessPieceArray.indexOf(item)].x = x;
            newChessPieceArray[chessPieceArray.indexOf(item)].y = y;
          }
        }
        setChessPieceArray(newChessPieceArray);

        // NOTE 这里是Take Turns的代码
        setCurrentPlayer(currentPlayer === 'red' ? 'black' : 'red');


        // dropPiece(selectedPiece)
      },
      collect: (mon) => ({
        isOver: !!mon.isOver(),
        canDrop: !!mon.canDrop()
      })
    });

  return (
    <Grid ref={drop} className={className}>
      {children}
    </Grid>
  )

}
