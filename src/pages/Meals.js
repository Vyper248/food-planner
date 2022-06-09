import { useContext, useState } from 'react';

import context from '../state/context';
import { organiseMeals } from '../functions';

import BasicButton from '../components/BasicButton';
import Modal from '../components/Modal';
import Container from '../components/Container';
import MealGroup from '../containers/MealGroup';

import AddEditMeal from '../containers/AddEditMeal';

const Meals = () => {
    const { meals, dispatch } = useContext(context);
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [mealToEdit, setMealToEdit] = useState(undefined);

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

    let organisedMeals = organiseMeals(meals);

    return (
        <div>
            <h3>Meals</h3>
            <Container>
                <BasicButton label='Add New Meal' color='var(--button-color-normal)' onClick={openAddModal}/>
                { organisedMeals.breakfast.length === 0 ? null : <MealGroup heading='Breakfast' mealsInGroup={organisedMeals.breakfast} openEditModal={openEditModal}/> }
                { organisedMeals.lunch.length === 0 ? null : <MealGroup heading='Lunch' mealsInGroup={organisedMeals.lunch} openEditModal={openEditModal}/> }
                { organisedMeals.dinner.length === 0 ? null : <MealGroup heading='Dinner' mealsInGroup={organisedMeals.dinner} openEditModal={openEditModal}/> }
            </Container>
            <Modal open={editOpen} closeFunc={closeModal}>
                { editOpen ? <AddEditMeal meal={mealToEdit} onFinish={onChangeMeal} onCancel={closeModal}/> : null }
            </Modal>
            <Modal open={addOpen} closeFunc={closeModal}>
                { addOpen ? <AddEditMeal onFinish={onAddMeal} onCancel={closeModal}/> : null }
            </Modal>
        </div>
    );
}

export default Meals;