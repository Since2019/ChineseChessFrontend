import React from 'react';
import Table from "../components/WelcomePage/Tables";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid';


// Styled Components
const Button = styled.button`
    width : 90px;
    height : 90px;
    background-color : ;
    position: relative;
`;


export default function WelcomePage() {
    // const navigate = useNavigate();
    return (
        <>

            <h2>WelcomePage</h2>
            <Grid container spacing={2}>

                {
                    [...Array(10)].map((item, index): any => (
                        <Grid item xs={4}>
                            <Table tableNum={index}/>
                            <br />
                            <Link to='/board/ai'>
                                <Button>
                                    Play against AI
                                </Button>
                            </Link>

                        </Grid>
                    ))
                }

            </Grid>


        </>
    )
}
