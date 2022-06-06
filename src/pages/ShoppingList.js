import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';

import context from '../state/context';

import Container from '../components/Container';
import Input from '../components/Input';
import StyledTable from '../components/Styled/StyledTable';
import BasicButton from '../components/BasicButton';
import StockList from '../containers/StockList';

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
    const { planner, meals, items, shoppingList, stockList, dispatch } = useContext(context);
    const [ itemList, setItemList ] = useState([]);

    useEffect(() => {
        const listArr = getList(planner.dailyMeals);
        checkIfChecked(listArr, shoppingList);
        setItemList(listArr);
    }, [planner, stockList]);

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

    const checkIfChecked = (listArr, shoppingList) => {
        listArr.forEach(item => {
            if (shoppingList[item.id] === true) item.checked = true;
        });
    }

    const getQtyNeeded = (itemId, qty) => {
        let item = items.find(item => item.id === itemId);
        if (!item) return 0;

        let stockItem = stockList.find(item => item.id === itemId);
        if (stockItem) qty -= stockItem.stock;

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
            if (item.id === id) {
                item.checked = !item.checked;
                if (item.checked) dispatch({type: 'SET_SHOPPING_LIST_ITEM_TRUE', payload: id});
                else if (!item.checked) dispatch({type: 'SET_SHOPPING_LIST_ITEM_FALSE', payload: id});
            }
            return item;
        });
        setItemList(listArr);
    }

    const uncheckAllItems = () => {
        dispatch({type: 'CLEAR_SHOPPING_LIST'});
        let listArr = itemList.map(item => {
            item.checked = false;
            return item;
        });
        setItemList(listArr);
    }

    return (
        <div>
            <h3>Shopping List</h3>
            <Container>
                <BasicButton label='Uncheck All' color='var(--button-color-caution)' onClick={uncheckAllItems}/>
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
            <StockList/>
        </div>
    );
}

export default ShoppingList;