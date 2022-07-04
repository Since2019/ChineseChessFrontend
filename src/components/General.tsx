import React, { useState, useEffect } from 'react'
import blackJiang from "../assets/blackJiang.png"
import redShuai from "../assets/redShuai.png"
import { useBoardContext } from '../contexts/BoardContext';
import { ItemTypes } from "../constants/ItemTypes"
import {
    DragPreviewImage, // NOTE用于
    useDrag
} from "react-dnd";  // Handles Drag events


// NOTE: "props" 是由parent component传入，其中会包括color之类
export default function General(props: any) {

    // NOTE 棋子名字不会变化
    const name = "General";

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
     * //NOTE useDrag() Hook 
     * @param {isDragging} : 是 boolean，在拖拽的时候将会是 true
     * @param {drag}       : 一个redux connector, 将 useDrag 和 Element 连在一起 
     * @param {preview}    : 拖拽的时候的redux connector
     *  
    */
    const [{ isDragging }, drag, preview] = useDrag({
        type: ItemTypes.GENERAL,
        item: { name, color, x: props.x, y: props.y },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    // NOTE: 棋子移动时的逻辑在此
    //       用这个作为切入点，改变context.
    //       当isDragging发生变化时，
    useEffect(() => {

        if (isDragging) {
            console.log("Dragging" + name);

            for (let i = (4 - 1); i < 6; i++) {  // 0 ~ 3 = 1 ~ 4

                const x = i;

                if (color === "black") {
                    for (let j = 0; j < 3; j++) {

                        const y = j;

                        // 坐标减去棋子位置
                        const dx = x - props.x;
                        const dy = y - props.y;

                        // TODO II. 在这里传入 condition
                        try {
                            if (dx < 0) { // 左侧
                                if (Math.abs(dx) === 1 && Math.abs(dy) === 0 && !hasFriendlyPiece(props.x - 1, y, color)) {
                                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                                }
                            }
                            else if (dx > 0) {// 右侧
                                if (Math.abs(dx) === 1 && Math.abs(dy) === 0 && !hasFriendlyPiece(props.x + 1, y, color)) {
                                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                                }
                            }

                            if (dy < 0) { // 上方
                                if (Math.abs(dx) === 0 && Math.abs(dy) === 1 && !hasFriendlyPiece(x, props.y - 1, color)) {
                                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                                }
                            }
                            else if (dy > 0) {// 下方
                                if (Math.abs(dx) === 0 && Math.abs(dy) === 1 && !hasFriendlyPiece(x, props.y + 1, color)) {
                                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                                }
                                // TODO 飞将逻辑
                            }

                            // TODO III. 在这里进行运算结果的总合
                            setSelectedPiece({ name, color, x: props.x, y: props.y });
                        }
                        catch (e) {
                            console.error("caught exception e:", e);
                        }
                    }
                }
                else if (color === "red") {
                    for (let j = (8 - 1); j < 10; j++) {

                        const y = j;

                        // 坐标减去棋子位置
                        const dx = x - props.x;
                        const dy = y - props.y;

                        // TODO II. 在这里传入 condition
                        try {
                            if (dx < 0) { // 左侧
                                if (Math.abs(dx) === 1 && Math.abs(dy) === 0 && !hasFriendlyPiece(props.x - 1, y, color)) {
                                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                                }
                            }
                            else if (dx > 0) {// 右侧
                                if (Math.abs(dx) === 1 && Math.abs(dy) === 0 && !hasFriendlyPiece(props.x - 1, y, color)) {
                                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                                }
                            }

                            if (dy < 0) { // 上方
                                if (Math.abs(dx) === 0 && Math.abs(dy) === 1 && !hasFriendlyPiece(props.x - 1, y, color)) {
                                    setOverlayArray((oldArray: any) => [...oldArray, { x, y }]);
                                }

                            }
                            else if (dy > 0) {// 下方
                                if (Math.abs(dx) === 0 && Math.abs(dy) === 1 && !hasFriendlyPiece(props.x - 1, y, color)) {
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



            }
        }
        else {
            console.log("Stopped Dragging" + name);
            setOverlayArray([])
        }

    }, [isDragging])


    return (
        <img ref={drag} src={color === "red" ? redShuai : blackJiang} alt="将" />
    )
}
