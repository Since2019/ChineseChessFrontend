import React, {useState} from 'react'
import redXiang from "../assets/redXiang.png"




export default function Bishop(props:any) {

    const [color,setColor] = useState(props.color);
    
    return (
        <img src={redXiang} alt="红象"/> 
    )
}
