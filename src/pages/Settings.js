import { useContext } from 'react';
import styled from 'styled-components';

import context from '../state/context';

import { setColorScheme } from '../functions';

import Container from '../components/Container';
import Download from '../components/Download';
import Upload from '../components/Upload';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';

const StyledComp = styled.div`

`

const Settings = () => {
    const { items, meals, planner, shoppingList, stockList, colorScheme, hideBreakfast, hideLunch, hideDinner, dispatch } = useContext(context);

    const backupData = {
        items,
        meals,
        planner,
        shoppingList,
        stockList
    };

    const onChangeHideBreakfast = (val) => dispatch({type: 'SET_HIDE_BREAKFAST', payload: val});
    const onChangeHideLunch = (val) => dispatch({type: 'SET_HIDE_LUNCH', payload: val});
    const onChangeHideDinner = (val) => dispatch({type: 'SET_HIDE_DINNER', payload: val});

    const onUpload = (data) => {
        dispatch({type: 'RESTORE_LOCAL', payload: data});
    }

    const onChangeColorScheme = (value) => {
        setColorScheme(value);
        dispatch({type: 'SET_COLOR_SCHEME', payload: value});
    }

    return (
        <StyledComp>
            <h3>Settings</h3>
            <Container>
                <h4>General</h4>
                <Dropdown labelText='Color Scheme' value={colorScheme} options={['Blue', 'Green', 'Grey', 'Black', 'Red']} onChange={onChangeColorScheme}/>
                <br/>
                <Input type='checkbox' labelText='Hide Breakfast' value={hideBreakfast} onChange={onChangeHideBreakfast}/>
                <Input type='checkbox' labelText='Hide Lunch' value={hideLunch} onChange={onChangeHideLunch}/>
                <Input type='checkbox' labelText='Hide Dinner' value={hideDinner} onChange={onChangeHideDinner}/>
                <h4>Download Backup</h4>
                <Download data={backupData}/>
                <h4>Upload Backup</h4>
                <p>This will overwrite the data currently stored for the planner.</p>
                <Upload onUpload={onUpload}/>
            </Container>
        </StyledComp>
    );
}

export default Settings;