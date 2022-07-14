import React, { useEffect } from 'react'
import redShi from "../assets/redShi.png"
import blackShi from "../assets/blackShi.png"
import { useBoardContext } from '../contexts/BoardContext';
import { ItemTypes } from "../constants/ItemTypes"
import {
    DragPreviewImage, // NOTE用于
    useDrag
} from "react-dnd";  // Handles Drag events

export default function Guard(props: any) {

    // NOTE 棋子名字不会变化
    const name = "Guard";

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
        
    }, [isDragging]);
}