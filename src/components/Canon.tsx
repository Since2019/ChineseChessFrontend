import React, { useState, useEffect } from 'react';
import blackPao from "../assets/blackPao.png";
import redPao from "../assets/redPao.png";

import { useBoardContext } from "../contexts/BoardContext";

import { DragPreviewImage, useDrag } from "react-dnd";  // Handles Drag events

import { ItemTypes } from "../constants/ItemTypes"


import {
    MIN_X,
    MAX_X,
    MIN_Y,
    MAX_Y,
} from "../constants/BoardConstants";



// NOTE: "props" 是由parent component传入，其中会包括color之类
// TODO: 将 "props" 改成 {color,x,y} 这样的 destructured 格式
export default function Canon(props: any) {

    // NOTE 从 Global Context中提取所需的function
    const {
        chessPieceArray, setOverlayArray,
        selectedPiece, setSelectedPiece,
        hasPiece, hasFriendlyPiece,
    } = useBoardContext();

    // NOTE 根据象棋的规则，棋子名字不会变化
    const name = "Canon";

    // 
    const [color, setColor] = useState(props.color);

    /**  
     * NOTE: useDrag() Hook 
     * @param {isDragging} : 是 boolean，在拖拽的时候将会是 true
     * @param {drag}       : 一个redux connector, 将 useDrag 和 Element 连在一起 
     * @param {preview}    : 拖拽的时候的redux connector
     *  
    */
    const [{ isDragging }, drag, preview] = useDrag({
        type: ItemTypes.ROOK,
        item: { name, color, x: props.x, y: props.y },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging()
        })
    });


    // NOTE: 棋子移动时的逻辑在此
    //       用这个作为切入点，改变context.

    useEffect(() => {
        if (isDragging) {

            setSelectedPiece({ name, color, x: props.x, y: props.y });

            let has_screen_up: boolean = false;
            let has_screen_down: boolean = false;
            let has_screen_left: boolean = false;
            let has_screen_right: boolean = false;

            // TODO: 上
            for (let y = props.y - 1; y >= MIN_Y; y--) {
                const x = props.x;
                // TODO: 发现有炮台
                if (hasPiece(x, y) && has_screen_up === false) {
                    has_screen_up = true;
                    continue;
                }

                // 如果有炮台
                if (has_screen_up) {
                    // 炮台的下一个遍历到的敌方棋子就会被加入
                    if (hasPiece(x, y)) {
                        // NOTE 敌方棋子
                        if (!hasFriendlyPiece(x, y, color)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                            has_screen_up = false;
                            break;
                        }
                        // NOTE 己方棋子
                        else {
                            break;
                        }


                    }
                }
                // 无炮台, 该点无棋子, 继续遍历
                else if (!hasPiece(x, y) && !has_screen_up) {
                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                }
            }
            // TODO：下
            for (let y = props.y + 1; y <= MAX_Y; y++) {
                const x = props.x;
                // TODO: 发现有炮台
                if (hasPiece(x, y) && has_screen_down === false) {
                    has_screen_down = true;
                    continue;
                }

                // 如果有炮台
                if (has_screen_down) {
                    // 炮台的下一个遍历到的敌方棋子就会被加入
                    if (hasPiece(x, y)) {
                        // NOTE 敌方棋子
                        if (!hasFriendlyPiece(x, y, color)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                            has_screen_down = false;
                            break;
                        }
                        // NOTE 己方棋子
                        else {
                            break;
                        }


                    }
                }
                // 无炮台, 该点无棋子, 继续遍历
                else if (!hasPiece(x, y) && !has_screen_down) {
                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                }
            }
            // TODO：左
            for (let x = props.x - 1; x >= MIN_X; x--) {
                const y = props.y;
                // TODO: 发现有炮台
                if (hasPiece(x, y) && has_screen_left === false) {
                    has_screen_left = true;
                    continue;
                }

                // 如果有炮台
                if (has_screen_left) {
                    // 炮台的下一个遍历到的敌方棋子就会被加入
                    if (hasPiece(x, y)) {
                        // NOTE 敌方棋子
                        if (!hasFriendlyPiece(x, y, color)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                            has_screen_left = false;
                            break;
                        }
                        // NOTE 己方棋子
                        else {
                            break;
                        }


                    }
                }
                // 无炮台, 该点无棋子, 继续遍历
                else if (!hasPiece(x, y) && !has_screen_left) {
                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                }

            }
            // TODO: 右
            for (let x = props.x + 1; x <= MAX_X; x++) {
                const y = props.y;
                // TODO: 发现有炮台
                if (hasPiece(x, y) && has_screen_right === false) {
                    has_screen_right = true;
                    continue;
                }

                // 如果有炮台
                if (has_screen_right) {
                    // 炮台的下一个遍历到的敌方棋子就会被加入
                    if (hasPiece(x, y)) {
                        // NOTE 敌方棋子
                        if (!hasFriendlyPiece(x, y, color)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                            has_screen_right = false;
                            break;
                        }
                        // NOTE 己方棋子
                        else {
                            break;
                        }


                    }
                }
                // 无炮台, 该点无棋子, 继续遍历
                else if (!hasPiece(x, y) && !has_screen_right) {
                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                }
            }



        }
        else {
            // 停止拖曳, 清空Overlay
            setOverlayArray([])
        }

    }, [isDragging])

    return (
        <>
            {/* <DragPreviewImage connect={preview} src={redMa} /> */}
            <img ref={drag} src={color === "red" ? redPao : blackPao} alt="炮" />

        </>
    )

}