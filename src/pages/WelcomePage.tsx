import React from 'react';
import Table from "../components/WelcomePage/Tables";
import styled from 'styled-components';
import { Link, useNavigate  } from "react-router-dom";
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
            <Table />
            <br />

            <Link to='/board/ai'>
                <Button>
                    Play against AI
                </Button>
            </Link>
        </>
    )
}
