import { useState, useContext } from 'react';

import context from '../state/context';

import BasicButton from '../components/BasicButton';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';

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

    if (editing && meal.name === undefined) return null;

    const onChangeName = (value) => setName(value);
    const onChangeType = (value) => setType(value);

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
    }

    const onChangeQty = (index) => (qty) => {
        let newItemList = itemList.map((obj, i) => {
            if (i === index) return {...obj, qty: qty};
            return obj;
        });
        setItemList(newItemList);
    }

    const onSave = () => {
        if (name === '') return;
        if (itemList.length === 0) return;
        let newItem = {...meal, name, type, itemList};
        onFinish(newItem);
    }

    const onAddItem = () => {
        let newObj = {id: firstItem, qty: 1};
        let newItemList = [...itemList, newObj];
        setItemList(newItemList);
    }

    const onDeleteItem = (index) => () => {
        let newItemList = itemList.filter((obj, i) => i !== index);
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
                    itemList.map((item, i) => {
                        let measurement = getMeasurementText(item.id);
                        return (
                            <div key={`itemList-${i}`}>
                                <Dropdown labelText='Item' width='150' value={item.id} options={items.map( item => ({value: item.id, display: `${item.name} (${item.size}${item.measurement})`}) )} onChange={onChangeItem(i)}/>
                                <Input type='number' labelText={measurement} labelWidth='100' width='70' value={item.qty} onChange={onChangeQty(i)}/>
                                <BasicButton label='Del' width='50px' onClick={onDeleteItem(i)}/>
                                <br/>
                            </div>
                        );
                    })
                }
                <BasicButton label='Add New Item' color='lightblue' width='150px' onClick={onAddItem}/>
            </section>
            <footer>
                <BasicButton label='Save' onClick={onSave}/>
                <BasicButton label='Cancel' onClick={onCancel}/>
            </footer>
        </>
    );
}

export default AddEditMeal;