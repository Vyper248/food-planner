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

    & > a.right {
        float: right;
        border-right: none;
        border-left: 1px solid gray;
    }
`

const MenuBar = () => {
    return (
        <StyledComp>
            <Link to='/'>Home</Link>
            <Link to='/shoppingList'>Shopping List</Link>
            <Link to='/items'>Items</Link>
            <Link to='/meals'>Meals</Link>
            <Link to='/settings' className='right'>Settings</Link>
        </StyledComp>
    );
}

export default MenuBar;