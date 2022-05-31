import styled from 'styled-components';

const StyledComp = styled.ul`
    text-align: left;
    border: 1px solid #DDD;
    border-radius: 5px;
    padding: 0px;
    display: inline-block;
    width: ${props => props.width};
    margin: 5px;

    & > li {
        border-bottom: 1px solid #DDD;
        padding: 5px;
        list-style: none;
    }

    & > li:last-child {
        border-bottom: none;
    }

    & > h4 {
        margin: 0px;
        border-bottom: 1px solid #DDD;
        padding: 5px;
        text-align: center;
        background-color: #DDD;
    }
`;

const List = ({children, width='150px', heading=''}) => {
    return (
        <StyledComp width={width}>
            { heading.length > 0 ? <h4>{heading}</h4> : null }
            {children}
        </StyledComp>
    );
}

export default List;