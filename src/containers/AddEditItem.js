import { useState } from 'react';

import BasicButton from '../components/BasicButton';
import Dropdown from '../components/Dropdown';
import Grid from '../components/Grid';
import Input from '../components/Input';

const AddEditItem = ({item={}, editing=false, onFinish, onCancel}) => {
    const [name, setName] = useState(item.name || '');
    const [size, setSize] = useState(item.size || 0);
    const [measurement, setMeasurement] = useState(item.measurement || 'g');
    const [calories, setCalories] = useState(item.calories || 0);
    const [price, setPrice] = useState(item.price || 0);
    const [error, setError] = useState('');

    if (editing && item.name === undefined) return null;

    const onChangeMeasurement = (value) => setMeasurement(value);
    const onChangeCalories = (value) => setCalories(value);
    const onChangePrice = (value) => setPrice(value);

    const onChangeSize = (value) => {
        setSize(value);
        setError('');
    }

    const onChangeName = (value) => {
        setName(value);
        setError('');
    }

    const onSave = () => {
        if (name === '') {
            setError('Please give the meal a name');
            return;
        }

        if (size === 0) {
            setError('Please set the size');
            return;
        }

        let newItem = {...item, name, size, measurement, calories, price};
        onFinish(newItem);
    }

    return (
        <>
            <header style={{fontWeight: 'bold'}}>
                { editing ? <span>{name}</span> : 'New Item' }
            </header>
            <section>
                <Input type='text' autoFocus placeholder='Item Name' labelText='Name' labelWidth='150' value={name} onChange={onChangeName}/><br/>
                <Grid columnTemplate='1fr 1fr'>
                    <Input type='number' labelText='Size' labelWidth='150' value={size} onChange={onChangeSize}/>
                    <Dropdown labelText='Measurement' value={measurement} labelWidth='150' width='100' options={['g', 'ml', ' items']} onChange={onChangeMeasurement}/>
                    <Input type='number' labelText='Calories' labelWidth='150' value={calories} onChange={onChangeCalories}/>
                    <span id='caloriesInfo'>This is the total calories for the entire pack.</span>
                    <Input type='number' labelText='Price' labelWidth='150' value={price} onChange={onChangePrice}/>
                    <span id='caloriesInfo'>This is the total price for the pack.</span>
                </Grid>
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

export default AddEditItem;