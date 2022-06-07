import styled from 'styled-components';

import BasicButton from './BasicButton';

const StyledComp = styled.div`
    position: absolute;
    border-radius: 5px;
    padding: 5px;
    z-index: 2;
    background-color: var(--background-color);
    top: 100%;
    border: 1px solid var(--button-color-caution);
    left: 5px;
    width: calc(100% - 10px);

    & > h4 {
        margin: 5px;
    }

    & > p {
        margin-top: 5px;
        margin-bottom: 5px;
    }
`

const ConfirmationPopup = ({message='', onConfirm, onCancel}) => {
    return (
        <StyledComp>
            <h4>Please Confirm</h4>
            <p>{message}</p>
            <BasicButton label='Continue' width='100px' onClick={onConfirm}/>
            <BasicButton label='Cancel' width='100px' onClick={onCancel}/>
        </StyledComp>
    );
}

export default ConfirmationPopup;