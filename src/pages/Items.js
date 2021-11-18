import styled from 'styled-components';
import { useContext, useState } from 'react';

import context from '../state/context';

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

    let sortedItems = items.sort((a,b) => {
        if (sort === 'Name') return a.name < b.name ? -1 : 1;
        if (sort === 'Size') return a.size - b.size;
        if (sort === 'Calories') return a.calories - b.calories;
        if (sort === 'Portions') return a.portions - b.portions;
        return 0;
    });
    
    return (
        <StyledComp>
            <h3>Items</h3>
            <Container>
                <Grid columnTemplate='1fr 1fr 1fr'>
                    <div></div>
                    <div><BasicButton label='Add New Item' color='lightblue' onClick={openAddModal}/></div>
                    <div><Dropdown labelText='Sort By' value={sort} options={['Name', 'Calories', 'Size', 'Portions']} onChange={onChangeSort}/></div>
                </Grid>
                { 
                    sortedItems.map(item => {
                        return (
                            <Card key={item.id}>
                                <header>{item.name}</header>
                                <section>
                                    <TableBasic data={[['Size', item.size+item.measurement], ['Calories', item.calories], ['Portions', item.portions]]}/>
                                </section>
                                <footer>
                                    <BasicButton label="Edit" onClick={openEditModal(item)} width='80px' color='lightblue'/>
                                    <ConfirmButtonPopup label="Delete" width='80px' color='red' onClick={onDeleteItem(item)}/>
                                </footer>
                            </Card>
                        );
                    })
                }
            </Container>
            <Modal open={editOpen} closeOnClickOutside={true} closeFunc={closeModal}>
                { editOpen ? <AddEditItem item={itemToEdit} editing={true} onFinish={onChangeItem} onCancel={closeModal}/> : null }
            </Modal>
            <Modal open={addOpen} closeOnClickOutside={true} closeFunc={closeModal}>
                { addOpen ? <AddEditItem onFinish={onAddItem} onCancel={closeModal}/> : null }
            </Modal>
        </StyledComp>
    );
}

export default Items;