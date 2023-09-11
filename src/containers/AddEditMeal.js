import { useState, useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import context from '../state/context';

import { sortArray, parseCurrency } from '../functions';

import BasicButton from '../components/BasicButton';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';

const AddEditMeal = ({meal={}, editing=false, onFinish, onCancel}) => {
    const { items } = useContext(context);
    const [name, setName] = useState(meal.name || '');
    const [itemList, setItemList] = useState(meal.itemList || []);
    const [type, setType] = useState(meal.type || 'Dinner');
    const [error, setError] = useState('');

    let filteredItems = items.filter(item => {
        if (itemList.find(obj => obj.id === item.id) !== undefined) return false;
        return true;
    });

    let firstItem = filteredItems.length > 0 ? filteredItems[0].id : 0;

    if (editing && meal.name === undefined) return null;

    const onChangeType = (value) => setType(value);

    const onChangeName = (value) => {
        setName(value);
        setError('');
    }

    const getMeasurementText = (itemId) => {
        let itemObj = items.find(obj => obj.id === itemId);
        if (!itemObj) return 'Qty';
        let { measurement } = itemObj;
        if (measurement === ' items') measurement = 'Qty';
        else if (measurement === 'g') measurement = 'Grams';
        return measurement;
    }

    const onChangeItem = (index) => (item) => {
        let newItemList = itemList.map((obj, i) => {
            if (i === index) return {...obj, id: item};
            return obj;
        });
        setItemList(newItemList);
        setError('');
    }

    const onChangeQty = (index) => (qty) => {
        let newItemList = itemList.map((obj, i) => {
            if (i === index) return {...obj, qty: qty};
            return obj;
        });
        setItemList(newItemList);
    }

    const onSave = () => {
        if (name === '') {
            setError('Please give the meal a name');
            return;
        }

        if (itemList.length === 0) {
            setError('Please add an item to the meal');
            return;
        }

        let newItem = {...meal, name, type, itemList};
        onFinish(newItem);
    }

    const onAddItem = () => {
        let newObj = {id: firstItem, qty: 1};
        let newItemList = [...itemList, newObj];
        setItemList(newItemList);
        setError('');
    }

    const onDeleteItem = (index) => () => {
        let newItemList = itemList.filter((obj, i) => i !== index);
        setItemList(newItemList);
    }

    const sortedItems = sortArray('Name', items);

    return (
        <>
            <header style={{fontWeight: 'bold'}}>
                { editing ? <span>{name}</span> : 'New Item' }
            </header>
            <section>
                <Input type='text' autoFocus placeholder='Item Name' labelText='Name' labelWidth='150' width='200' value={name} onChange={onChangeName}/><br/>
                <Dropdown labelText='Type' width='120' value={type} options={['Breakfast', 'Lunch', 'Dinner']}  onChange={onChangeType}/><br/>
                {
                    itemList.map((item, i) => {
                        let measurement = getMeasurementText(item.id);
                        return (
                            <div key={`itemList-${i}`}>
                                <Dropdown labelText='Item' width='150' value={item.id} options={sortedItems.map( item => ({value: item.id, display: `${item.name} (${item.size}${item.measurement})${item.price > 0 ? `- ${parseCurrency(item.price)}` : ''}`}) )} onChange={onChangeItem(i)}/>
                                <Input type='number' labelText={measurement} labelWidth='100' width='70' value={item.qty} onChange={onChangeQty(i)}/>
                                <BasicButton label={<FaTrashAlt/>} color='var(--button-color-caution)' iconSize='1.2em' width='50px' onClick={onDeleteItem(i)}/>
                                <br/>
                            </div>
                        );
                    })
                }
                {
                    items.length > 0 
                        ? <BasicButton label='Add New Item' color='var(--button-color-normal)' width='150px' onClick={onAddItem}/>
                        : <p>Please add an item before creating a meal</p> 
                }
                {
                    error.length > 0
                        ? <p style={{color: 'red'}}>{error}</p>
                        : null
                }
            </section>
            <footer>
                <BasicButton label='Save' onClick={onSave} color='var(--button-color-success)'/>
                <BasicButton label='Cancel' onClick={onCancel} color='var(--button-color-caution)'/>
            </footer>
        </>
    );
}

export default AddEditMeal;