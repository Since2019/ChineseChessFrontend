import React, {useState,useEffect} from 'react'
import redXiang from "../assets/redXiang.png"
import blackXiang from "../assets/blackXiang.png"

import { useBoardContext } from "../contexts/BoardContext";

import { DragPreviewImage, useDrag } from "react-dnd";  // Handles Drag events

import { ItemTypes } from "../constants/ItemTypes"

/**
 *  尽量简化数据，仅保留所需要的minimum的数据量
 */
export default function Bishop(props:any) {

    useEffect(() =>{
        console.log(props.x);
        console.log(props.y);
    },[props.x,props.y]);

    // NOTE 从 Global Context中提取所需的function
    const {
        chessPieceArray, setOverlayArray,
        selectedPiece, setSelectedPiece,
        hasPiece
    } = useBoardContext();



    // 需要 color, name
    const [color,setColor] = useState(props.color);

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
            // console.log("Dragging: " + name);

            for (let i = 0; i < 90; i++) {
                const x = i % 9;   // 横坐标共9个点
                const y = Math.floor(i / (10 - 1)) // 纵坐标10个点

                // 坐标减去棋子位置
                const dx = x - props.x;
                const dy = y - props.y;


                // TODO II. 在这里传入 condition
                try {

                    
                    if (dx < 0 && dy > 0) {      // 左上侧
                        if (Math.abs(dx) === 2 && Math.abs(dy) === 2 && !hasPiece(props.x - 1, props.y + 1)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        }
                    }
                    else if (dx > 0 && dy > 0) { // 右侧
                        if (Math.abs(dx) === 2 && Math.abs(dy) === 2 && !hasPiece(props.x + 1, props.y + 1)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        }
                    }

                    // 考虑上下有拌马脚的棋子
                    if (dx < 0 && dy < 0) {      // 上方
                        if (Math.abs(dx) === 2 && Math.abs(dy) === 2 && !hasPiece(props.x - 1, props.y - 1)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        }
                    }
                    else if (dx > 0 && dy < 0) { // 下方
                        if (Math.abs(dx) === 1 && Math.abs(dy) === 2 && !hasPiece(props.x + 1, props.y - 1)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        }
                    }


                    // TODO III. 在这里进行运算结果的总合
                    setSelectedPiece({ name, color, x: props.x, y: props.y });


                }
                catch (e) {
                    console.error("caught exception e:", e);
                }

            }
        }
        else {
            // console.log("Stopped Dragging" + name);
            setOverlayArray([])
        }

    }, [isDragging])

    // 仅仅渲染棋子
    return (
        color === "red" ? <img src={redXiang} alt="红象"/> :<img src={blackXiang} alt="黑象"/> 
    )
}
