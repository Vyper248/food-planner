import styled from 'styled-components';

const StyledComp = styled.div`
    display: inline-flex;
    flex-direction: column;
    margin: 5px;
    background-color: var(--background-color);
    border: 1px solid #AAA;
    border-radius: 5px;
    width: ${props => props.width};
    box-shadow: 1px 1px 3px #BBB;

    & header {
        font-weight: bold;
        padding: 10px;
        border-bottom: 1px solid #AAA;
    }

    & section {
        display: flex;
        justify-content: center;
        flex-grow: 1;
    }

    & footer {
        border-top: 1px solid #AAA;
    }
`

const Card = ({children, width='max-content'}) => {
    return (
        <StyledComp width={width}>
            { children }
        </StyledComp>
    );
}

export default Card;