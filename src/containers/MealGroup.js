import styled from 'styled-components';
import { useContext } from 'react';

import context from '../state/context';

import MealCard from './MealCard';

const StyledComp = styled.div`
    & div#mealContainer {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
`;

const MealGroup = ({mealsInGroup, heading, openEditModal}) => {
    const { meals, items, dispatch } = useContext(context);

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

    return (
        <StyledComp>
            <h4>{heading}</h4>
            <div id='mealContainer'>
                { 
                    mealsInGroup.map(meal => <MealCard key={'meal-'+meal.id} meal={meal} getCalories={getCalories} openEditModal={openEditModal} onDeleteItem={onDeleteItem}/>)
                }
            </div>
            { 
                mealsInGroup.length === 0 ? <p>No Meals</p> : null
            }
        </StyledComp>
    );
}

export default MealGroup;