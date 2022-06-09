import styled from 'styled-components';

import Input from '../components/Input';
import StyledTable from '../components/Styled/StyledTable';

const StyledRow = styled.tr`
    border: 1px solid var(--menu-border-color) !important;

    & > td#checkbox > div {
        margin: 0px;
        height: 25px;
    }
`

const ListItem = ({qty, name, checked=false, onClickCheckbox}) => {
    if (qty <= 0) return null;
    return (
        <StyledRow>
            <td id='checkbox'><Input type='checkbox' value={checked} onChange={onClickCheckbox}/></td>
            <td id='qty'>{qty}</td>
            <td id='name'>{name}</td>
        </StyledRow>
    );
}

const StyledListContainer = styled.div`
    display: flex;
    justify-content: center;

    & > table {
        margin: 10px;
    }
`;

const ShoppingListTable = ({itemList, onCheckItem}) => {
    const pageWidth = window.innerWidth;
    const totalItems = itemList.length;
    let combinedArr = [];

    //if over 15, split into 2 columns
    if (totalItems > 15 && totalItems <= 35 && pageWidth > 850) {
        let mid = Math.ceil(totalItems/2);
        let a = itemList.slice(0, mid+1);
        let b = itemList.slice(mid+1);
        combinedArr = [a, b];
    } else if (totalItems > 35 && pageWidth > 1320) {
        let midA = Math.ceil(totalItems/3);
        let midB = Math.ceil(totalItems/3*2);
        let a = itemList.slice(0, midA+1);
        let b = itemList.slice(midA+1, midB+1);
        let c = itemList.slice(midB+1);
        combinedArr = [a, b, c];
    } else {
        combinedArr = [itemList];
    }
    
    return (
        <StyledListContainer>
            {
                combinedArr.map((arr, i) => {
                    return (
                        <StyledTable key={'listTable-'+i}>
                            <thead>
                                <tr>
                                    <th style={{minWidth: '50px'}}></th>
                                    <th style={{minWidth: '60px'}}>Qty</th>
                                    <th style={{minWidth: '300px', maxWidth: '300px'}}>Item</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                arr.map(item => <ListItem key={'listItem-'+item.id} name={item.name} qty={item.qty} checked={item.checked} onClickCheckbox={onCheckItem(item.id)}/>)
                            }
                            </tbody>
                        </StyledTable>
                    );
                })
            }
        </StyledListContainer>
    );
}

export default ShoppingListTable;