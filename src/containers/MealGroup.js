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

    const getTotalValue = (meal, key, parseAsInt=false) => {
        let totalValue = 0;
        let missingVal = false;

        const thisMeal = meals.find(obj => obj.id === meal.id);
        if (thisMeal) {
            const mealItems = thisMeal.itemList.map(item => {
                let itemObj = items.find(obj => obj.id === item.id);
                if (!itemObj) return {[key]: 0};
                let copy = {...itemObj, qty: item.qty};
                return copy;
            });
        
            totalValue = mealItems.reduce((a,c) => {
                if (c[key] === undefined || c[key] === 0) {
                    missingVal = true;
                    return a;
                }

                if (parseAsInt) return a += parseInt((c[key] / c.size) * c.qty);
                else return a += (c[key] / c.size) * c.qty;
            }, 0);
        }

        return {totalValue, missingVal};
    }

    const sortedMeals = mealsInGroup.sort((a,b) => {
        if (a.name === b.name) return 0;
        return a.name < b.name ? -1 : 1;
    });

    return (
        <StyledComp>
            <h4>{heading}</h4>
            <div id='mealContainer'>
                { 
                    sortedMeals.map(meal => <MealCard key={'meal-'+meal.id} meal={meal} getValue={getTotalValue} openEditModal={openEditModal} onDeleteItem={onDeleteItem}/>)
                }
            </div>
            { 
                sortedMeals.length === 0 ? <p>No Meals</p> : null
            }
        </StyledComp>
    );
}

export default MealGroup;