import React, { useState, useEffect } from 'react';
import blackMa from "../assets/blackMa.png";
import redMa from "../assets/redMa.png";

import { useBoardContext } from "../contexts/BoardContext";

import { DragPreviewImage, useDrag } from "react-dnd";  // Handles Drag events

import { ItemTypes } from "../constants/ItemTypes"


// NOTE: "props" 是由parent component传入，其中会包括color之类
// TODO: 将 "props" 改成 {color,x,y} 这样的 destructured 格式
export default function Knight(props: any) {

    // NOTE 从 Global Context中提取所需的function
    const {
        chessPieceArray, setOverlayArray,
        selectedPiece, setSelectedPiece,
        hasPiece, hasFriendlyPiece,
    } = useBoardContext();

    // NOTE 根据象棋的规则，棋子名字不会变化
    const name = "Knight";

    // 
    const [color, setColor] = useState(props.color);

    // useEffect(() => {
    //     console.log("Knight props.color", props.color);
    // }, [props]);


    /**  
     * NOTE: useDrag() Hook 
     * @param {isDragging} : 是 boolean，在拖拽的时候将会是 true
     * @param {drag}       : 一个redux connector, 将 useDrag 和 Element 连在一起 
     * @param {preview}    : 拖拽的时候的redux connector
     *  
    */
    const [{ isDragging }, drag, preview] = useDrag({
        type: ItemTypes.KNIGHT,
        item: { name, color, x: props.x, y: props.y },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging()
        })
    });


    // NOTE: 棋子移动时的逻辑在此
    //       用这个作为切入点，改变context.

    // TODO: 或许可以把for loop写成一个接收if condition array的Function,
    //       在 II 的位置进行处理
    //       在 III 的位置进行汇总
    //       Condition 的格式： (Math.abs(dx) === 1 && Math.abs(dy) === 2)
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

                    // (Math.abs(dx) === 1 && Math.abs(dy) === 2))

                    // 考虑左右有拌马脚的棋子
                    if (dx < 0) {      // 左侧
                        if (Math.abs(dx) === 2 && Math.abs(dy) === 1 && !hasPiece(props.x - 1, props.y) && !hasFriendlyPiece(x , y, color)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        }
                    }
                    else if (dx > 0) { // 右侧
                        if (Math.abs(dx) === 2 && Math.abs(dy) === 1 && !hasPiece(props.x + 1, props.y) && !hasFriendlyPiece(x , y, color)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        }
                    }

                    // 考虑上下有拌马脚的棋子
                    if (dy < 0) {      // 上方
                        if (Math.abs(dx) === 1 && Math.abs(dy) === 2 && !hasPiece(props.x, props.y - 1) && !hasFriendlyPiece(x , y, color)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        }
                    }
                    else if (dy > 0) { // 下方
                        if (Math.abs(dx) === 1 && Math.abs(dy) === 2 && !hasPiece(props.x, props.y + 1) && !hasFriendlyPiece(x , y, color)) {
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





    return (
        <>
            {/* <DragPreviewImage connect={preview} src={redMa} /> */}
            <img ref={drag} src={color === "red" ? redMa : blackMa} alt="马" />

        </>
    )


}




