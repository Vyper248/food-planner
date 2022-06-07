import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledComp = styled.div`
    position: sticky;
    top: 0px;
    border-bottom: 1px solid var(--menu-border-color);
    background-color: var(--menu-background-color);
    text-align: left;
    z-index: 2;

    & > a {
        display: inline-block;
        padding: 5px 10px;
        text-decoration: none;
        color: black;
        border-right: 1px solid var(--menu-border-color);
    }

    & > a:hover {
        background-color: var(--menu-selected-color);
    }

    & > a.right {
        float: right;
        border-right: none;
        border-left: 1px solid var(--menu-border-color);
    }

    & > a.selected {
        background-color: var(--menu-selected-color);
    }
`

const MenuBar = () => {
    return (
        <StyledComp>
            <NavLink className={({isActive}) => isActive ? 'selected' : ''} to='/'>Home</NavLink>
            <NavLink className={({isActive}) => isActive ? 'selected' : ''} to='/shoppingList'>Shopping List</NavLink>
            <NavLink className={({isActive}) => isActive ? 'selected' : ''} to='/items'>Items</NavLink>
            <NavLink className={({isActive}) => isActive ? 'selected' : ''} to='/meals'>Meals</NavLink>
            <NavLink className={({isActive}) => isActive ? 'right selected' : 'right'} to='/settings'>Settings</NavLink>
        </StyledComp>
    );
}

export default MenuBar;