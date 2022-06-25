import React, { useEffect } from 'react'

import styled from 'styled-components'


// Styled Components
const Grid = styled.div`
    width : 90px;
    height : 90px;
    background-color : ;
`;

// 格子将会存放棋子
export default function BoardSquare({ className,children }: any) {

  return (
    <Grid className={className}>
      {children}
    </Grid>
  )

}
