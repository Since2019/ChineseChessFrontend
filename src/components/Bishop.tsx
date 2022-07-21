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

    const name = "Bishop";

    useEffect(() =>{
        console.log(props.x);
        console.log(props.y);
    },[props.x,props.y]);

    // NOTE 从 Global Context中提取所需的function
    const {
        chessPieceArray, setOverlayArray,
        selectedPiece, setSelectedPiece,
        hasPiece, hasFriendlyPiece,
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

            for (let i = 0; i < 45; i++) {
                let x = i % 9;   // 横坐标共9个点
                
                let y:number = -1;
                if (color === "black"){
                    y = Math.floor(i / (10 - 1)) // 纵坐标每边5个点
                }else if (color === "red"){
                    y = 5 + Math.floor(i / (10 - 1)) // 纵坐标每边5个点
                }

                // 坐标减去棋子位置
                const dx = x - props.x;
                const dy = y - props.y;


                // TODO II. 在这里传入 condition
                try {

                    
                    if (dx < 0 && dy > 0) {      // 左上侧
                        if (Math.abs(dx) === 2 && Math.abs(dy) === 2 && !hasPiece(props.x - 1, props.y + 1) && !hasFriendlyPiece(x , y, color)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        }
                    }
                    if (dx > 0 && dy > 0) { // 右侧
                        if (Math.abs(dx) === 2 && Math.abs(dy) === 2 && !hasPiece(props.x + 1, props.y + 1 && !hasFriendlyPiece(x , y, color))) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        }
                    }

                    // 考虑上下有拌脚的棋子
                    if (dx < 0 && dy < 0) {      // 上方
                        if (Math.abs(dx) === 2 && Math.abs(dy) === 2 && !hasPiece(props.x - 1, props.y - 1) && !hasFriendlyPiece(x , y, color)) {
                            setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                        }
                    }
                    if (dx > 0 && dy < 0) { // 下方
                        if (Math.abs(dx) === 2 && Math.abs(dy) === 2 && !hasPiece(props.x + 1, props.y - 1) && !hasFriendlyPiece(x , y, color)) {
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
        <>
            {/* <DragPreviewImage connect={preview} src={redMa} /> */}
            <img ref={drag} src={color === "red" ? redXiang : blackXiang} alt="相" />

        </> 
    )
}
