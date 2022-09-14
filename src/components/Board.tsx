import React, { useEffect, useState } from 'react'
import BoardSquare from "./BoardSquare"   // 存放棋子的Square
import styled from 'styled-components'
import chess_board from "../assets/antontw_chinese_chess_plate.svg"

import Knight from './Knight'
import General from './General'
import Bishop from './Bishop'
import Advisor from './Advisor'
import Rook from './Rook'

import { io, Socket } from "socket.io-client";



import { useBoardContext } from '../contexts/BoardContext'
import { useParams } from 'react-router-dom';


const Square = styled.div`
  width: "100%";
  height: "100%";
  display: "flex";
  flex-wrap: "wrap";
  background-image: url(${chess_board}),
  grid-template-columns: repeat(9,90px),
  background-repeat: "no-repeat",
`;




// NOTE 用于判断 使用什么来渲染的
const chessPieceElementMap = new Map<string, any>([
  ["Knight", Knight],
  ["General", General],
  ["Bishop", Bishop],
  ["Advisor", Advisor],
  ["Rook", Rook]
]
);


var CHATBOX_SERVER: string = process.env.REACT_APP_CHATBOX_SERVER as string;


// ========= SOCKET =============================================
if (!process.env.REACT_APP_CHATBOX_SERVER) {
  CHATBOX_SERVER = "localhost:4000/"
}

const socketIoClient = io(CHATBOX_SERVER, { autoConnect: false });
// ^^^^^^^^^ SOCKET ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// NOTE AI 模式，服务端无需帮socket用to()注册到某个room
const loadAiSocket = () => {
  console.log("loading AI Socket");
  // NOTE 传送了 type 和 id 到服务器
  socketIoClient.auth = { type: "ai", id: Date.now() }
  socketIoClient.connect();
  console.log(socketIoClient.auth)
}

// NOTE PVP 模式，服务端要帮socket用to()注册到某个room
const loadPvpSocket = (tableId: string, playerId: string) => {
  console.log("loading PvP Socket");
  socketIoClient.auth = { tableId, playerId };
  socketIoClient.connect();
}

export default function Board({ className, children }: any) {

  const params = useParams();

  // NOTE 判断是PvP还是PvE
  useEffect(() => {
    console.log("params", params);
    console.log(params.mode);
    if (params.mode)
      if (params.mode.toLowerCase() === "ai") {
        loadAiSocket();
      }
      else if (params.mode.toLowerCase() === "pvp") {

        if (params.tableId && params.playerId) {
          loadPvpSocket(params.tableId, params.playerId);
        }

      }

  }, [])

  // TODO: 数据Array, 用context来keep track. 走子之后update
  const {
    chessPieceArray, // 棋子信息，用于重新渲染
    overlayArray
  } = useBoardContext();


  // NOTE 这个function用于根据context里传入的overlayArray进行渲染
  const renderOverlay = (x: number, y: number) => {
    return overlayArray.map((square: any, index: number) => {
      // console.log("overlay",square.x,square.y);
      return ((square.x === x && square.y === y) ? <div style={{ backgroundColor: "red", opacity: "0.5", width: "80%", height: "80%", position: "absolute", top: 0, left: 0, zIndex: 10 }}></div> : null)
    })
  }


  // NOTE 渲染 Grid
  const renderSqure = (i: number) => {
    const x = i % 9;   // 横坐标共9个点
    const y = Math.floor(i / (10 - 1)) // 纵坐标10个点
    return (
      <BoardSquare x={x} y={y} className={className} key={i}>
        {renderPiece(x, y)}
        {renderOverlay(x, y)}
        {/* x{x},y{y} */}
      </BoardSquare>
    )
  }


  // NOTE: 如何才能让Board知道什么棋子在什么位置?
  const renderPiece = (x: number, y: number) => {
    // console.log(x);
    // console.log(y);
    return chessPieceArray.map((piece: any, index: number) => {

      // if (piece.x === x && piece.y === y) {
      //   console.log("渲染棋子：", piece.name);
      //   console.log("piece",piece);
      //   console.log("chessPieceArray",chessPieceArray);
      // }

      const ChessElem: any = chessPieceElementMap.get(piece.name); //HACK 动态渲染Elem: https://stackoverflow.com/questions/29875869/react-jsx-dynamic-component-name


      return (
        (piece.x === x && piece.y === y) ? <ChessElem key={x + y} color={piece.color} x={piece.x} y={piece.y} /> : null  // piece.x 和 piece.y 传入后供棋子判断可如何走
      )
    }

    )
  };

  // NOTE 发送90个格子, 用 renderSquare 的 function 来赋予坐标
  const squares = Array.from(new Array(90), (element, index) =>
    renderSqure(index)
  );

  return (
    <Square
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

    </Square>
  )

}
