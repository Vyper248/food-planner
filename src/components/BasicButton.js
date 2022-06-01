import React from 'react';
import styled from 'styled-components';

const StyledComp = styled.div`
    background-color: ${props => props.color};
    color: ${props => props.textColor ? props.textColor : 'black'};
    width: ${props => props.width ? props.width : '150px'};
    border-radius: 5px;
    padding: 5px;
    margin: ${props => props.margin ? props.margin : '5px'};
    display: inline-block;
    height: 28px;

    & > svg {
        font-size: 1.5em;
        position: relative;
        top: -2px;
    }

    &:hover {
        cursor: pointer;
        filter: brightness(75%);
    }
`;

const BasicButton = ({label='', onClick=()=>{}, color='#CCC', textColor, width, margin}) => {
    return (
        <StyledComp 
            color={color} 
            textColor={textColor}
            width={width} 
            margin={margin} 
            onClick={onClick}>{label}</StyledComp>
    );
}

export default BasicButton;