import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledComp = styled.div`
    border-bottom: 1px solid gray;
    background-color: white;
    text-align: left;

    & > a {
        display: inline-block;
        padding: 5px 10px;
        text-decoration: none;
        color: black;
        border-right: 1px solid gray;
    }

    & > a:hover {
        background-color: #EEE;

    }
`

const MenuBar = () => {
    return (
        <StyledComp>
            <Link to='/'>Home</Link>
            <Link to='/items'>Items</Link>
            <Link to='/meals'>Meals</Link>
        </StyledComp>
    );
}

export default MenuBar;