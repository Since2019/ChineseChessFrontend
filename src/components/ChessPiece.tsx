import React, { Component } from 'react';
import { DragPreviewImage, useDrag } from "react-dnd";


// 需要怎么样从ChessPiece当中得到当前的格子
class ChessPiece extends Component {
    protected name: string;    //TODO :protected, not private
    protected iconSrc: string;  
    public color : string;

    constructor(props: any) {
        super(props);
        // TODO: immutable 数据
        this.name = props.name;
        this.color = "black"
        this.iconSrc = "";





        // TODO: mutable  数据
        this.state = {
            x: -1,
            y: -1
        };

    }

    render() {
        return (
            <div>
                <span>{this.name}</span>
                <img src={this.iconSrc} alt="ChessPiece" />
            </div>
        );
    }
}

export default ChessPiece;