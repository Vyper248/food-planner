import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';

import context from '../state/context';

import Container from '../components/Container';
import Dropdown from '../components/Dropdown';
import BasicButton from '../components/BasicButton';
import StyledTable from '../components/Styled/StyledTable';
import Input from '../components/Input';
import { sortArray } from '../functions';

const StyledComp = styled.div`
    margin-bottom: 10px;

    & tr {
        border: 1px solid var(--menu-border-color) !important;
    }
`

const StockList = () => {
    const { stockList=[], items, dispatch } = useContext(context);

    const [ itemToAdd, setItemToAdd ] = useState('');
    const [ filteredItems, setFilteredItems ] = useState([]);

    useEffect(() => {
        const filtered = items.filter(item => {
            let checkItem = stockList.find(obj => obj.id === item.id);
            if (checkItem) return false;
            return true;
        });

        const sorted = sortArray('Name', filtered);

        const first = sorted[0]?.id;
        setItemToAdd(first);

        setFilteredItems(sorted);
    }, [stockList, items]);

    const onAddItem = () => {
        const item = items.find(item => item.id === itemToAdd);
        if (!item) return;

        let newItem = {
            id: item.id,
            name: item.name,
            measurement: item.measurement,
            stock: 1
        }

        dispatch({type: 'ADD_STOCK', payload: newItem});
    }

    const onClearStock = () => {
        dispatch({type: 'CLEAR_STOCK'});
    }

    const onChangeStock = (id) => (value) => {
        let stockObj = stockList.find(item => item.id === id);
        dispatch({type: 'EDIT_STOCK', payload: {...stockObj, stock: value}});
    }

    const onRemoveStock = (id) => () => {
        dispatch({type: 'DELETE_STOCK', payload: {id:id}});
    }

    return (
        <StyledComp>
            <h3>Current Stock</h3>
            <Container>
                <div>
                    <Dropdown labelText='Item' value={itemToAdd} options={filteredItems.map(item => ({value: item.id, display: item.name}))} onChange={setItemToAdd}/>
                    <BasicButton label='Add' color='var(--button-color-normal)' onClick={onAddItem}/>
                    <BasicButton label='Clear Stock' color='var(--button-color-caution)' onClick={onClearStock}/>
                </div>
                <br/>
                <div>After adding an item, input the current quantity of individual items (or weight)</div>
                <br/>
                <StyledTable>
                    <tbody>
                    {
                        stockList.map(item => {
                            return (
                                <tr key={'stockItem-'+item.id}>
                                    <td className='input'><Input type='number' width='80' value={item.stock} onChange={onChangeStock(item.id)}/></td>
                                    <td style={{minWidth: '61px'}}>{item.measurement}</td>
                                    <td style={{minWidth: '200px'}}>{item.name}</td>
                                    <td className='input'><BasicButton label={<FaTrashAlt/>} width='50px' iconSize='1.2em' color='var(--button-color-caution)' onClick={onRemoveStock(item.id)}/></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </StyledTable>
            </Container>
        </StyledComp>
    );
}

export default StockList;