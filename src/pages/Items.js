import styled from 'styled-components';
import { useContext, useState } from 'react';

import context from '../state/context';
import { sortArray } from '../functions';

import BasicButton from '../components/BasicButton';
import Grid from '../components/Grid';
import Dropdown from '../components/Dropdown';
import Modal from '../components/Modal';
import Container from '../components/Container';
import ItemCard from '../containers/ItemCard';

import AddEditItem from '../containers/AddEditItem';

const StyledComp = styled.div`
    & div#itemContainer {
        display: flex;
        flex-wrap: wrap;
    }
`

const Items = () => {
    const { items, dispatch } = useContext(context);
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
                <div id='itemContainer'>
                    { 
                        sortedItems.map(item => <ItemCard key={item.id} item={item} openEditModal={openEditModal} onDeleteItem={onDeleteItem}/>)
                    }
                </div>
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