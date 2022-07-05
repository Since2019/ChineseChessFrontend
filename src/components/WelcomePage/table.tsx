import React from 'react'

import styled from 'styled-components';
import circleTable from "../../assets/WelcomePage/circleTable.png";


// Styled Components

const Seat = styled.button`
  width : 90px;
  height : 90px;
  background-color : 'red';
  position : relative;
`

export default function Table(props: any) {

  return (
    <>
      <div> table {props.name} </div>
      <Seat>spot 1</Seat>
      <img src={circleTable} alt="circleTable" />
      <Seat>spot 2</Seat>
    </>

  )

}
