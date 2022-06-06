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

import AddEditItem from '../containers/AddEditItem';

const StyledComp = styled.div`

`

const Items = () => {
    const { items, meals, dispatch } = useContext(context);
    const [sort, setSort] = useState('Name');
    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(undefined);

    const onChangeSort = (value) => {
        setSort(value);
    }

    const openEditModal = (item) => () => {
        setItemToEdit(item);
        setEditOpen(true);
    }

    const openAddModal = () => {
        setAddOpen(true);
    }

    const closeModal = () => {
        setEditOpen(false);
        setAddOpen(false);
    }

    const onAddItem = (item) => {
        dispatch({type: 'ADD_ITEM', payload: item});
        setAddOpen(false);
    }

    const onChangeItem = (item) => {
        setEditOpen(false);
        setItemToEdit(undefined);
        dispatch({type: 'EDIT_ITEM', payload: item});
    }

    const onDeleteItem = (item) => () => {
        dispatch({type: 'DELETE_ITEM', payload: item});
    }

    const checkIfCanDelete = (item) => {
        let canDelete = true;

        for (let i = 0; i < meals.length; i++) {
            const meal = meals[i];
            const itemList = meal.itemList;

            if (itemList.find(itemObj => itemObj.id === item.id) !== undefined) {
                canDelete = false;
                break;
            }
        }

        return canDelete;
    }

    let sortedItems = sortArray(sort, items);
    
    return (
        <StyledComp>
            <h3>Items</h3>
            <Container>
                <Grid columnTemplate='1fr 1fr 1fr'>
                    <div></div>
                    <div><BasicButton label='Add New Item' color='var(--button-color-normal)' onClick={openAddModal}/></div>
                    <div><Dropdown labelText='Sort By' value={sort} options={['Name', 'Calories', 'Size']} onChange={onChangeSort}/></div>
                </Grid>
                { 
                    sortedItems.map(item => {
                        return (
                            <Card key={item.id}>
                                <header>{item.name}</header>
                                <section>
                                    <TableBasic data={[['Size', item.size+item.measurement], ['Calories', item.calories]]}/>
                                </section>
                                <footer>
                                    <BasicButton label="Edit" onClick={openEditModal(item)} width='80px' color='var(--button-color-normal)'/>
                                    {
                                        checkIfCanDelete(item) ? <ConfirmButtonPopup label="Delete" width='80px' color='var(--button-color-caution)' onClick={onDeleteItem(item)}/>
                                                               : null
                                    }
                                </footer>
                            </Card>
                        );
                    })
                }
                <p>Note: You can't delete an item being used in a meal.</p>
            </Container>
            <Modal open={editOpen} closeFunc={closeModal}>
                { editOpen ? <AddEditItem item={itemToEdit} editing={true} onFinish={onChangeItem} onCancel={closeModal}/> : null }
            </Modal>
            <Modal open={addOpen} closeFunc={closeModal}>
                { addOpen ? <AddEditItem onFinish={onAddItem} onCancel={closeModal}/> : null }
            </Modal>
        </StyledComp>
    );
}

export default Items;