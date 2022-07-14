import React, { useEffect } from 'react'
import redShi from "../assets/redShi.png"
import blackShi from "../assets/blackShi.png"
import { useBoardContext } from '../contexts/BoardContext';
import { ItemTypes } from "../constants/ItemTypes"
import {
    DragPreviewImage, // NOTE用于
    useDrag
} from "react-dnd";  // Handles Drag events

export default function Advisor(props: any) {

    // NOTE 棋子名字不会变化
    const name = "Advisor";

    // NOTE 颜色和坐标由props传入
    const { color, x, y } = props;

    // NOTE 从 Global Context中提取所需的function
    const {
        chessPieceArray, setOverlayArray,
        selectedPiece, setSelectedPiece,
        hasPiece,
        hasFriendlyPiece
    } = useBoardContext();

    /**  
     * NOTE: useDrag() Hook 
     * @param {isDragging} : 是 boolean，在拖拽的时候将会是 true
     * @param {drag}       : 一个redux connector, 将 useDrag 和 Element 连在一起 
     * @param {preview}    : 拖拽的时候的redux connector
     *  
    */
    const [{ isDragging }, drag, preview] = useDrag({
        type: ItemTypes.BISHOP,
        item: { name, color, x: props.x, y: props.y },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    useEffect(() => {
        if (isDragging) {
            // TODO: figure out the coordinates and the logic
            console.log("Dragging" + name);

            // scanning the board for possible moves
            for (let i = 0; i < 27; i++) {

                let x = i % 9;   // 横坐标共9个点
                
                let y: number = -1;

                if (color === "black") {
                    y = Math.floor(i / (10 - 1)) // 纵坐标每边5个点
                } else if (color === "red") {
                    y = 7 + Math.floor(i / (10 - 1)) // 纵坐标每边5个点
                }

                // 坐标减去棋子位置
                const dx = x - props.x;
                const dy = y - props.y;
                
                try {
                    //左上
                    if (dx < 0 && dy > 0) { }
                    //右上
                    if (dx > 0 && dy > 0) { }
                    //左下
                    if (dx < 0 && dy < 0) { }
                    //右下
                    if (dx > 0 && dy < 0) { }

                } catch (e) {
                    console.error("Caught exception: ", e);
                }
            }
        }

    }, [isDragging]);

    return (
        <img ref={drag} src={color === "red" ? redShi : blackShi} alt="士" />
    )
}