import React from "react";
import styled from 'styled-components';



export default function AlertNotice(props) {
    return (
        <AlertContainer>
            <div id="alert" className="alert-notice">
                <span>No Stock of {props.alert} is present</span>
            </div>
        </AlertContainer>
    );
}

const AlertContainer = styled.div`

#alert{
    font-family: "Times New Roman", Times, serif;
}
.alert-notice {
    margin: 1rem 0;
    padding: 0.3rem;
    border: 1px solid #e07c7c;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8d6d6;
  }
`