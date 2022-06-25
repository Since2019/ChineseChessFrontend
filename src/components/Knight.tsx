import React, { Component } from 'react';
import ChessPiece from './ChessPiece'
import blackMa from "../assets/blackMa.png"
import { BoardContextConsumer } from "../contexts/BoardContext"

class Knight extends ChessPiece {
    public color: string = "black";
    public x :number;
    public y :number;

    constructor(props: any) {
        super(props);
        this.name = 'Knight';
        this.color = props.color;
        this.iconSrc = blackMa;
        console.log("constructor color:", this.color);

        this.x= props.x; 
        this.y= props.y;
    }


    // TODO 返回能走的点
    canMove(x: number, y: number): Array<Array<number>> {
        return [
            [1, 2]
        ]
    }



    render() {

        // 必须要有 Consumer 才能使用 context 
        // canMove(value.x, value.y);

        return (
            <BoardContextConsumer>

                {(value: any) => (
                    <img onClick={()=>this.canMove(this.x,this.y)} src={this.color==='red'?this.iconSrc:this.iconSrc} alt="黑马" />
                )}


            </BoardContextConsumer>
        );
    }
}

export default Knight;