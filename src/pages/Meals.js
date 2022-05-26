import styled from 'styled-components';
import { useContext, useState } from 'react';

import context from '../state/context';
import { sortArray } from '../functions';

import Card from '../components/Card';
import BasicButton from '../components/BasicButton';
import TableBasic from '../components/TableBasic';
import ConfirmButtonPopup from '../components/ConfirmButtonPopup';
import Grid from '../components/Grid';
import Dropdown from '../components/Dropdown';
import Modal from '../components/Modal';
import Container from '../components/Container';

import AddEditMeal from '../containers/AddEditMeal';

const StyledComp = styled.div`

`

const Meals = () => {
    const { meals, items, dispatch } = useContext(context);
    const [sort, setSort] = useState('Name');
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [mealToEdit, setMealToEdit] = useState(undefined);

    const onChangeSort = (value) => {
        setSort(value);
    }

    const openEditModal = (meal) => () => {
        setMealToEdit(meal);
        setEditOpen(true);
    }

    const openAddModal = () => {
        setAddOpen(true);
    }

    const closeModal = () => {
        setEditOpen(false);
        setAddOpen(false);
    }

    const onAddMeal = (meal) => {
        dispatch({type: 'ADD_MEAL', payload: meal});
        setAddOpen(false);
    }

    const onChangeMeal = (meal) => {
        setEditOpen(false);
        setMealToEdit(undefined);
        dispatch({type: 'EDIT_MEAL', payload: meal});
    }

    const onDeleteItem = (meal) => () => {
        dispatch({type: 'DELETE_MEAL', payload: meal});
    }

    const getCalories = (meal) => {
        let totalCalories = 0;

        const thisMeal = meals.find(obj => obj.id === meal.id);
        if (thisMeal) {
            const mealItems = thisMeal.itemList.map(item => {
                let itemObj = items.find(obj => obj.id === item.id);
                if (!itemObj) return {calories: 0};
                let copy = {...itemObj, qty: item.qty};
                return copy;
            });
        
            totalCalories = mealItems.reduce((a,c) => {
                if (c.calories === 0) return a;
                return a += parseInt(c.calories / c.size * c.qty);
            }, 0);
        }

        return totalCalories;
    }

    let sortedMeals = sortArray(sort, meals);

    return (
        <StyledComp>
            <h3>Meals</h3>
            <Container>
                <Grid columnTemplate='1fr 1fr 1fr'>
                    <div></div>
                    <div><BasicButton label='Add New Meal' color='lightblue' onClick={openAddModal}/></div>
                    <div><Dropdown labelText='Sort By' value={sort} options={['Name', 'Calories']} onChange={onChangeSort}/></div>
                </Grid>
                { 
                    sortedMeals.map(meal => {
                        return (
                            <Card key={meal.id}>
                                <header>{meal.name}</header>
                                <section>
                                    <TableBasic data={[['Type', meal.type], ['Calories', getCalories(meal)]]}/>
                                </section>
                                <footer>
                                    <BasicButton label="Edit" onClick={openEditModal(meal)} width='80px' color='lightblue'/>
                                    <ConfirmButtonPopup label="Delete" width='80px' color='red' onClick={onDeleteItem(meal)}/>
                                </footer>
                            </Card>
                        );
                    })
                }
            </Container>
            <Modal open={editOpen} closeFunc={closeModal}>
                { editOpen ? <AddEditMeal meal={mealToEdit} onFinish={onChangeMeal} onCancel={closeModal}/> : null }
            </Modal>
            <Modal open={addOpen} closeFunc={closeModal}>
                { addOpen ? <AddEditMeal onFinish={onAddMeal} onCancel={closeModal}/> : null }
            </Modal>
        </StyledComp>
    );
}

export default Meals;