import React, { useState, useEffect } from 'react';
// 棋子图片
import blackZu from "../assets/blackZu.png";
import redBing from "../assets/redBing.png";

// 拖拽组件
import { useBoardContext } from "../contexts/BoardContext";
import { DragPreviewImage, useDrag } from "react-dnd";  // Handles Drag events
import { ItemTypes } from "../constants/ItemTypes"

// 
import { BOUNDARY_RIVER_Y_COOR_UPPER, BOUNDARY_RIVER_Y_COOR_LOWER } from "../constants/BoardConstants"
import {
    MIN_Y,
    MAX_Y
} from "../constants/BoardConstants";

// NOTE: "props" 是由parent component传入，其中会包括color之类
// TODO: 将 "props" 改成 {color,x,y} 这样的 destructured 格式
export default function Pawn(props: any) {

    // NOTE 从 Global Context中提取所需的function
    const {
        chessPieceArray, setOverlayArray,
        selectedPiece, setSelectedPiece,
        hasPiece, hasFriendlyPiece,
    } = useBoardContext();

    // NOTE 根据象棋的规则，棋子名字不会变化,所以用const
    const name = "Pawn";

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

                // 当前遍历到的横纵坐标减去棋子位置
                const dx = x - props.x;
                const dy = y - props.y;


                // TODO II. 在这里传入 condition
                try {

                    if (color === "black") {
                        // (1) 兵在己方河界不得左右移动
                        if ( props.y >= MIN_Y && props.y <= BOUNDARY_RIVER_Y_COOR_UPPER ) {
                            // (2) 兵永不能退后, 每次只能移动一格
                            if (dx === 0 && dy === 1) {
                                setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                            }

                        }
                        // (3) 兵在对方河界可以左右移动
                        else if (props.y > BOUNDARY_RIVER_Y_COOR_UPPER &&   props.y  <= MAX_Y) {
                            // (2) 兵永不能退后, 每次只能移动一格
                            if (dx === 0 && dy === 1) {
                                setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                            }
                            if (Math.abs(dx) == 1 && dy == 0) {
                                setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                            }
                        }
                    }

                    else if (color === "red") {
                        // (1) 兵在己方河界不得左右移动
                        if (props.y >= BOUNDARY_RIVER_Y_COOR_LOWER && props.y <= MAX_Y) {
                            // (2) 兵永不能退后, 每次只能移动一格
                            if (dx === 0 && dy === -1) {
                                setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                            }

                        }
                        // (3) 兵在对方河界可以左右移动
                        else if (  props.y >= MIN_Y && props.y < BOUNDARY_RIVER_Y_COOR_LOWER) {
                            // (2) 兵永不能退后, 每次只能移动一格
                            if (dx === 0 && dy === -1) {
                                setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                            }
                            if (Math.abs(dx) === 1 && dy === 0) {
                                setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                            }
                        }

                    }


                    // TODO : (3) 兵每次只能移动一格


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
            <img ref={drag} src={color === "red" ? redBing : blackZu} alt="兵" />
        </>
    )


}




