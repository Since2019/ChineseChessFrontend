import React, { useState, useEffect } from 'react';
import blackJu from "../assets/blackJu.png";
import redJu from "../assets/redJu.png";

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
export default function Rook(props: any) {

    // NOTE 从 Global Context中提取所需的function
    const {
        chessPieceArray, setOverlayArray,
        selectedPiece, setSelectedPiece,
        hasPiece, hasFriendlyPiece,
    } = useBoardContext();

    // NOTE 根据象棋的规则，棋子名字不会变化
    const name = "Rook";

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
        type: ItemTypes.ROOK,
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
            
            setSelectedPiece({ name, color, x: props.x, y: props.y });
            
            // TODO: 上
            for (let y = props.y - 1; y >= MIN_Y; y--) {
                const x = props.x;
                
                if (!hasPiece(x, y)){
                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                }
                else{
                    if (hasFriendlyPiece(x, y, color)){
                        break;
                    }
                    else{
                        setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        break;
                    }
                }
            }

            // TODO: 下
            for (let y = props.y + 1; y <= MAX_Y; y++) {
                const x = props.x;
                
                if (!hasPiece(x, y)){
                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                }
                else{
                    if (hasFriendlyPiece(x, y, color)){
                        break;
                    }
                    else{
                        setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        break;
                    }
                }
            }
            
            // TODO: 左
            for (let x = props.x - 1; x >= MIN_X; x--) {
                const y = props.y;
                
                if (!hasPiece(x, y)){
                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                }
                else{
                    if (hasFriendlyPiece(x, y, color)){
                        break;
                    }
                    else{
                        setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        break;
                    }
                }
            }

            // TODO: 右
            for (let x = props.x + 1; x <= MAX_X; x++) {
                const y = props.y;
                
                if (!hasPiece(x, y)){
                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                }
                else{
                    if (hasFriendlyPiece(x, y, color)){
                        break;
                    }
                    else{
                        setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        break;
                    }
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
            <img ref={drag} src={color === "red" ? redJu : blackJu} alt="车" />

        </>
    )

}