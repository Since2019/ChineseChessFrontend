import React, { useEffect, useState } from 'react'
import BoardSquare from "./BoardSquare"   // 存放棋子的Square
import styled from 'styled-components'
import chess_board from "../assets/antontw_chinese_chess_plate.svg"

import ChessPiece from "./ChessPiece"
import Knight from './Knight'
import General from './General'

import { useBoardContext } from '../contexts/BoardContext'

const Div = styled.div`
  width: "100%";
  height: "100%";
  display: "flex";
  flex-wrap: "wrap";
  background-image: url(${chess_board}),
  grid-template-columns: repeat(9,90px),
  background-repeat: "no-repeat",
`;




// TODO 用于判断 使用什么来渲染的
const chessPieceElementMap = new Map<string, any>([
  ["Knight", Knight],
  ["General", General]
]
);

// const chessPieceElementMap = new Map<string, typeof ChessPiece>([
//   ["Knight", Knight],
//   ["General", General]
// ]
// );






export default function Board({ className, children }: any) {


  // TODO: 数据Array, 用context来keep track. 走子之后update
  const {
    chessPieceArray, // 棋子信息，用于重新渲染
    overlayArray
  } = useBoardContext();



  const renderOverlay = (x: number, y: number) => {
    return overlayArray.map((square: any, index: number) => {
      return ((square.x === x && square.y === y) ? <div style={{ background: "red" }}></div> : null)
    })
  }



  const renderSqure = (i: number) => {
    const x = i % 9;   // 横坐标共9个点
    const y = Math.floor(i / 10) // 纵坐标10个点
    return (
      <BoardSquare x={x} y={y} className={className} key={i}>
        {renderPiece(x, y)}
        {renderOverlay(x, y)}
      </BoardSquare>
    )
  }


  // TODO: 如何才能让Board知道什么棋子在什么位置?
  const renderPiece = (x: number, y: number) => {
    // console.log(x);
    // console.log(y);
    return chessPieceArray.map((piece: any, index: number) => {

      console.log("chessPieceArray");
      if (piece.x === x && piece.y === y)
        console.log("渲染棋子：", piece.name);

      const ChessElem: any = chessPieceElementMap.get(piece.name); //HACK 动态渲染Elem: https://stackoverflow.com/questions/29875869/react-jsx-dynamic-component-name


      return (
        (piece.x === x && piece.y === y) ? <ChessElem color={piece.color} x={piece.x} y={piece.y} /> : null  // piece.x 和 piece.y 传入后供棋子判断可如何走
      )
    }

    )
  };

  // 发送90个格子
  const squares = Array.from(new Array(90), (element, index) =>
    renderSqure(index)
  );

  return (
    <Div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        backgroundImage: `url(${chess_board})`,
        gridTemplateColumns: `repeat(9,90px)`,
        backgroundRepeat: "no-repeat",
      }}
    >
      {squares}
    </Div>
  )
}
