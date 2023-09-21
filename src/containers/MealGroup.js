import styled from 'styled-components';
import { useContext } from 'react';

import context from '../state/context';

import MealCard from './MealCard';

import { getTotalValue } from '../functions';

const StyledComp = styled.div`
    & div#mealContainer {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
`;

const MealGroup = ({mealsInGroup, heading, openEditModal}) => {
    const { items, dispatch } = useContext(context);

    const onDeleteItem = (meal) => () => {
        dispatch({type: 'DELETE_MEAL', payload: meal});
    }

    const getValue = (meal, key, parseAsInt=false) => {
        return getTotalValue(meal, key, items, parseAsInt);
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
                    sortedMeals.map(meal => <MealCard key={'meal-'+meal.id} meal={meal} getValue={getValue} openEditModal={openEditModal} onDeleteItem={onDeleteItem}/>)
                }
            </div>
            { 
                sortedMeals.length === 0 ? <p>No Meals</p> : null
            }
        </StyledComp>
    );
}

export default MealGroup;