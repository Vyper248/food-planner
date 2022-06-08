import { useContext } from 'react';
import styled from 'styled-components';

import context from '../state/context';

import { setColorScheme } from '../functions';

import Container from '../components/Container';
import Download from '../components/Download';
import Upload from '../components/Upload';
import Dropdown from '../components/Dropdown';

const StyledComp = styled.div`

`

const Settings = () => {
    const { items, meals, planner, shoppingList, stockList, colorScheme, dispatch } = useContext(context);

    const backupData = {
        items,
        meals,
        planner,
        shoppingList,
        stockList
    };

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