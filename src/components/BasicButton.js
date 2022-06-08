import React from 'react';
import styled from 'styled-components';

import getContrastYIQ from '../colorFunction';

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
        font-size: ${props => props.iconSize};
        position: relative;
        top: ${props => props.iconTop};
    }

    &:hover {
        cursor: pointer;
        filter: brightness(75%);
    }
`;

const BasicButton = ({label='', onClick=()=>{}, color='#CCC', textColor, width, margin, iconSize='1.5em', iconTop='0px'}) => {
    if (color.includes('var(')) {
        let propertyName = color.replace('var(', '').replace(')','');
        let hex = getComputedStyle(document.documentElement).getPropertyValue(propertyName);
        if (textColor === undefined && color !== '#CCC') textColor = getContrastYIQ(hex);
    } else {
        if (textColor === undefined && color !== '#CCC') textColor = getContrastYIQ(color);
    }
    
    return (
        <StyledComp 
            color={color} 
            textColor={textColor}
            width={width} 
            margin={margin}
            iconSize={iconSize} 
            iconTop={iconTop}
            onClick={onClick}>{label}</StyledComp>
    );
}

export default BasicButton;