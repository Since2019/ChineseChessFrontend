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
      accept: [ItemTypes.KNIGHT, ItemTypes.GENERAL],
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

        return false;     // TODO: Change to 'true' to allow moving every where                        
      },
      // React-DND's drop listener
      drop: () => {

        let newChessPieceArray = [...chessPieceArray]


        for (let item of newChessPieceArray) {
          // NOTE 先将原先这个位置上的棋子除掉 
          if (item.x === x && item.y === y) {
            newChessPieceArray.splice(newChessPieceArray.indexOf(item), 1);
            // newChessPieceArray = chessPieceArray.filter((item: any) => (
            //   item.x !== x && item.y !== y
            // ));
          }
        }



        for (let item of newChessPieceArray) {
          // console.log(" item of chessPieceArray",item);
          // console.log(" selectedPiece",selectedPiece);
          if (item.x === selectedPiece.x && item.y === selectedPiece.y) {
            console.log("item===selectedPiece", item, selectedPiece)
            console.log("index of selectedPiece", newChessPieceArray.indexOf(item));
            console.log(newChessPieceArray);


            //NOTE selectedPiece 的坐标得到了更改
            newChessPieceArray[newChessPieceArray.indexOf(item)].x = x;
            newChessPieceArray[newChessPieceArray.indexOf(item)].y = y;
            break;
          }
        }
        setChessPieceArray(newChessPieceArray);

        console.log("newChessPieceArray", newChessPieceArray);

        // NOTE 这里是Take Turns的代码,转换为另一方下
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
