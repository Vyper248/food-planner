import { useContext } from 'react';
import styled from 'styled-components';

import context from '../state/context';

import Container from '../components/Container';
import Download from '../components/Download';
import Upload from '../components/Upload';

const StyledComp = styled.div`

`

const Settings = () => {
    const { items, meals, planner, shoppingList, stockList, dispatch } = useContext(context);

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

    return (
        <StyledComp>
            <h3>Settings</h3>
            <Container>
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