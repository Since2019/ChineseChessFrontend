import React, {useState,useEffect} from 'react'
import redXiang from "../assets/redXiang.png"
import blackXiang from "../assets/blackXiang.png"



/**
 *  尽量简化数据，仅保留所需要的minimum的数据量
 */
export default function Bishop(props:any) {

    useEffect(() =>{
        console.log(props.x);
        console.log(props.y);
    },[props.x,props.y]);

    // 需要 color, name
    const [color,setColor] = useState(props.color);

    // 仅仅渲染棋子
    return (
        color === "red" ? <img src={redXiang} alt="红象"/> :<img src={blackXiang} alt="黑象"/> 
    )
}
