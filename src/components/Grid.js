import styled from 'styled-components';

const StyledComp = styled.div`
    display: grid;
    grid-template-columns: ${props => props.columnTemplate};
    margin: 5px;
    grid-gap: 5px;
`

const Grid = ({children, columnTemplate='1fr 1fr'}) => {
    return (
        <StyledComp columnTemplate={columnTemplate}>
            { children }
        </StyledComp>
    );
}

export default Grid;