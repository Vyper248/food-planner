import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import context from '../state/context';

import BasicButton from '../components/BasicButton';
import Dropdown from '../components/Dropdown';
import Grid from '../components/Grid';
import Input from '../components/Input';

const StyledItemRow = styled.div`

`;

const ItemRow = ({item, qty, onDelete}) => {
    let measurement = item.measurement;
    if (measurement === ' items') measurement = '';
    return (
        <StyledItemRow>
            <span>{`${qty}${measurement} ${item.name}`}</span>
            <BasicButton label='Del' width='50px' onClick={onDelete}/>
        </StyledItemRow>
    );
}

const AddEditMeal = ({meal={}, editing=false, onFinish, onCancel}) => {
    const { items } = useContext(context);
    const [name, setName] = useState(meal.name || '');
    const [itemList, setItemList] = useState(meal.itemList || []);
    const [type, setType] = useState(meal.type || 'Dinner');

    let filteredItems = items.filter(item => {
        if (itemList.find(obj => obj.id === item.id) !== undefined) return false;
        return true;
    });

    let firstItem = filteredItems.length > 0 ? filteredItems[0].id : 0;
    const [itemToAdd, setItemToAdd] = useState(firstItem);
    const [itemMeasurement, setItemMeasurement] = useState('g');
    const [itemQty, setItemQty] = useState(1);

    useEffect(() => {
        let itemObj = items.find(obj => obj.id === itemToAdd);
        let measurement = itemObj.measurement;
        if (measurement === ' items') measurement = 'Qty';
        else if (measurement === 'g') measurement = 'Grams';
        setItemMeasurement(measurement);
    }, [itemToAdd]);

    if (editing && meal.name === undefined) return null;

    const onChangeName = (value) => setName(value);
    const onChangeItemToAdd = (value) => setItemToAdd(value);
    const onChangeItemQty = (value) => setItemQty(value);
    const onChangeType = (value) => setType(value);

    const onSave = () => {
        if (name === '') return;
        if (itemList.length === 0) return;
        let newItem = {...meal, name, type, itemList};
        onFinish(newItem);
    }

    const onAddItem = () => {
        let newObj = {id: itemToAdd, qty: itemQty};
        let newItemList = [...itemList, newObj];
        setItemList(newItemList);
    }

    const parseItemID = (id) => {
        let item = items.find(item => item.id === id);
        return item;
    }

    const onDeleteItem = (id) => () => {
        let newItemList = itemList.filter(obj => obj.id !== id);
        setItemList(newItemList);
    }

    return (
        <>
            <header style={{fontWeight: 'bold'}}>
                { editing ? <span>{name}</span> : 'New Item' }
            </header>
            <section>
                <Input type='text' autoFocus placeholder='Item Name' labelText='Name' labelWidth='150' width='200' value={name} onChange={onChangeName}/><br/>
                <Dropdown labelText='Type' width='120' value={type} options={['Breakfast', 'Lunch', 'Dinner']}  onChange={onChangeType}/><br/>
                {
                    itemList.map(({id, qty}) => {
                        let item = parseItemID(id);
                        return <ItemRow key={id} item={item} qty={qty} onDelete={onDeleteItem(id)}/>
                    })
                }
                <Dropdown labelText='Item' width='150' value={itemToAdd} options={filteredItems.map( item => ({value: item.id, display: item.name}) )}  onChange={onChangeItemToAdd}/>
                <Input type='number' labelText={itemMeasurement} width='70' value={itemQty} onChange={onChangeItemQty} min='1'/>
                <BasicButton label='+' color='lightblue' width='40px' onClick={onAddItem}/>
            </section>
            <footer>
                <BasicButton label='Save' onClick={onSave}/>
                <BasicButton label='Cancel' onClick={onCancel}/>
            </footer>
        </>
    );
}

export default AddEditMeal;