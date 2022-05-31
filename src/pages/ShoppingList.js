import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';

import context from '../state/context';

import Container from '../components/Container';
import List from '../components/List';
import Input from '../components/Input';
import StyledTable from '../components/Styled/StyledTable';

const StyledComp = styled.tr`
    width: 500px;
    border: 1px solid #CCC !important;

    & > td#checkbox > div {
        margin: 0px;
        height: 25px;
    }
`

const ListItem = ({qty, name, checked=false, onClickCheckbox}) => {
    return (
        <StyledComp>
            <td id='checkbox'><Input type='checkbox' value={checked} onChange={onClickCheckbox}/></td>
            <td id='qty'>{qty}</td>
            <td id='name' style={{width: '300px'}}>{name}</td>
        </StyledComp>
    );
}

const ShoppingList = () => {
    const { planner, meals, items } = useContext(context);
    const [ itemList, setItemList ] = useState([]);

    useEffect(() => {
        const listArr = getList(planner.dailyMeals);
        setItemList(listArr);
    }, [planner]);

    const getMeal = (id) => {
        const meal = meals.find(meal => meal.id === id);
        return meal;
    }

    const addToList = (itemsNeeded, mealId) => {
        let meal = getMeal(mealId);
        if (meal) {
            let itemList = meal.itemList;
            itemList.forEach(item => {
                if (itemsNeeded[item.id] === undefined) itemsNeeded[item.id] = 0;
                itemsNeeded[item.id] += item.qty;
            });
        }
    }

    const getQtyNeeded = (itemId, qty) => {
        let item = items.find(item => item.id === itemId);
        if (!item) return 0;

        let qtyNeeded = qty / item.size;
        return {qty: Math.ceil(qtyNeeded), name: item.name, checked: false, id: itemId};
    }

    const getList = (allMeals) => {
        const itemsNeeded = {};
        const itemList = [];

        allMeals.forEach(personMeals => {
            personMeals.forEach(dailyMeals => {
                addToList(itemsNeeded, dailyMeals.breakfastId);
                addToList(itemsNeeded, dailyMeals.lunchId);
                addToList(itemsNeeded, dailyMeals.dinnerId);
            });
        });

        Object.keys(itemsNeeded).forEach(itemId => {
            let qty = itemsNeeded[itemId];
            let qtyDetails = getQtyNeeded(itemId, qty);
            itemList.push(qtyDetails);
        });

        return itemList;
    }

    const onCheckItem = (id) => () => {
        let listArr = itemList.map(item => {
            if (item.id === id) item.checked = !item.checked;
            return item;
        });
        setItemList(listArr);
    }

    return (
        <div>
            <h3>Shopping List</h3>
            <Container>
                <StyledTable>
                    <thead>
                        <tr>
                            <th style={{minWidth: '50px'}}></th>
                            <th style={{minWidth: '60px'}}>Qty</th>
                            <th>Item</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        itemList.map(item => <ListItem key={'listItem-'+item.id} name={item.name} qty={item.qty} checked={item.checked} onClickCheckbox={onCheckItem(item.id)}/>)
                    }
                    </tbody>
                </StyledTable>
            
            </Container>
        </div>
    );
}

export default ShoppingList;