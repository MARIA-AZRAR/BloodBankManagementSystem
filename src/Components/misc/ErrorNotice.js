import React from "react";
import styled from 'styled-components';



export default function ErrorNotice(props) {
    return (
        <ErrorContainer>
            <div id="error" className="error-notice">
                <span>{props.message}</span>
                <button onClick={props.clearError}></button>
            </div>
        </ErrorContainer>
    );
}

const ErrorContainer = styled.div`

#error{
    font-family: "Times New Roman", Times, serif;
}
.error-notice {
    margin: 1rem 0;
    padding: 0.3rem;
    border: 1px solid #e07c7c;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8d6d6;
  }
  .error-notice button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #df4343;
    text-align: center;
    color: #ffffff;
  }
`