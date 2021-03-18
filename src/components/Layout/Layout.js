import React from 'react';
import { Container } from "react-bootstrap";
import styled from "styled-components";


export const Layout = (props) => (
    <LayoutStyle >
            <Container className="container-fluid">
    {props.children}
</Container>
    </LayoutStyle>
)

const LayoutStyle = styled.div`
    .container{
        background-color: whitesmoke;
    }

    @media (min-width: 992px) {
        .container {
            max-width:100%;
        }
      }
      @media (min-width: 1200px) {
        .container {
            max-width:75%;
        }
      }

`