// import ChessPiece from './ChessPiece'
// import blackJiang from "../assets/blackJiang.png"
// class General extends ChessPiece {
//     public color : string ="black";

//     constructor(props:any){
//         super(props);
//         this.name = 'General';
//         this.color = "black"
//         this.iconSrc = blackJiang;
//     }



//     render() {
//         return (
//             <img src={this.iconSrc} alt="将" />
//         );
//     }
// }

// export default General;

import React from 'react'
import blackJiang from "../assets/blackJiang.png"
import redShuai from "../assets/redShuai.png"
import { useBoardContext } from '../contexts/BoardContext';

export default function General(props: any) {

    const color = props.color;

    const { 
        chessPieceArray, setChessPieceArray,
        overlayArray, setOverlayArray 
    } = useBoardContext(); //更新ChessArray状态


    const labelCanMove =()=>{
        setOverlayArray([[1,2],[2,4],[3,6]])
    }   

    return (
        <img onClick={labelCanMove} src={color === "red" ? redShuai : blackJiang} alt="将" />
    )
}
