import { useState, useContext } from 'react';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import context from '../state/context';
import { getTotalValue, parseCurrency } from '../functions';

import StyledMealTable from '../components/Styled/StyledMealTable';
import MealDropdown from '../containers/MealDropdown';
import BasicButton from '../components/BasicButton';

const StyledComp = styled.div`
    margin: 0px 20px;
`

const getMealCost = (arr, id, items) => {
    if (id === 0) return 0;
    let obj = arr.find(item => item.id === id);

    if (!obj) return 0;
    let value = getTotalValue(obj, 'price', items);
    return value.totalValue;
}

const Planner = ({dailyMeals, allMeals}) => {
    const { planner, meals, items, hideBreakfast, hideLunch, hideDinner, dispatch } = useContext(context);
    const { days } = planner;
    const [ openId, setOpenId ] = useState(0);
    const [ switching, setSwitching ] = useState(false);
    const [ switchId, setSwitchId] = useState(0);
    const [ switchType, setSwitchType ] = useState('');

    const breakfastMeals = meals.filter(meal => meal.type === 'Breakfast');
    const lunchMeals = meals.filter(meal => meal.type === 'Lunch');
    const dinnerMeals = meals.filter(meal => meal.type === 'Dinner');

    breakfastMeals.unshift({id: 0, name: 'Empty'});
    lunchMeals.unshift({id: 0, name: 'Empty'});
    dinnerMeals.unshift({id: 0, name: 'Empty'});

    const totalCost = () => {
        let totalCost = 0;
        dailyMeals.forEach(meal => {
            let breakfast = getMealCost(breakfastMeals, meal.breakfastId, items);
            let lunch = getMealCost(lunchMeals, meal.lunchId, items);
            let dinner = getMealCost(dinnerMeals, meal.dinnerId, items);
            totalCost += breakfast + lunch + dinner;
        });
        return totalCost;
    }

    const onOpenMeal = (id) => () => {
        setOpenId(id);
    }

    const onCloseMeal = () => {
        setOpenId(0);
    }

    const onChooseMeal = (dayId, type, mealId) => {
        let obj = dailyMeals.find(obj => obj.id === dayId);
        let newObj = {...obj};
        newObj[type] = mealId;
        dispatch({type: 'EDIT_PLANNER_MEAL', payload: newObj});
    }

    const startSwitching = (dayId, type) => {
        setSwitching(true);
        setSwitchId(dayId);
        setSwitchType(type);
        onCloseMeal();
    }

    const endSwitching = (dayId, typeKey) => {
        if (switchId === dayId) {
            setSwitching(false);
            return;
        }

        let objA = dailyMeals.find(obj => obj.id === switchId);
        let objB = dailyMeals.find(obj => obj.id === dayId);

        swapObjects(objA, objB, typeKey, switchType);
        setSwitching(false);
    }

    const moveUp = (objId, typeKey, type) => {
        let objA = dailyMeals.find(obj => obj.id === objId);
        if (objA === undefined) return;
        let index = dailyMeals.indexOf(objA);
        let adjustedIndex = index > 0 ? index-1 : dailyMeals.length-1;
        let objB = dailyMeals[adjustedIndex];
        swapObjects(objA, objB, typeKey, type);
    }

    const moveDown = (objId, typeKey, type) => {
        let objA = dailyMeals.find(obj => obj.id === objId);
        if (objA === undefined) return;
        let index = dailyMeals.indexOf(objA);
        let adjustedIndex = index < dailyMeals.length-1 ? index+1 : 0;
        let objB = dailyMeals[adjustedIndex];
        swapObjects(objA, objB, typeKey, type);
    }

    const getNewMealsArr = (newPersonMeals) => {
        let index = allMeals.indexOf(dailyMeals);
        let newArr = [...allMeals];
        newArr[index] = newPersonMeals;
        return newArr;
    }

    const moveStartDayUp = () => {
        let newArray = [...dailyMeals];
        let lastItem = newArray.pop();
        newArray.unshift(lastItem);
        let newMeals = getNewMealsArr(newArray);
        dispatch({type: 'SET_DAILY_MEALS', payload: newMeals});
    }

    const moveStartDayDown = () => {
        let newArray = [...dailyMeals];
        let firstItem = newArray.shift();
        newArray.push(firstItem);
        let newMeals = getNewMealsArr(newArray);
        dispatch({type: 'SET_DAILY_MEALS', payload: newMeals});
    }

    const swapObjects = (objA, objB, typeKey, type) => {
        let mealA = objA[typeKey];
        let mealB = objB[typeKey];

        let newObjA = {...objA};
        newObjA[typeKey] = mealB;

        let newObjB = {...objB};
        newObjB[typeKey] = mealA;

        dispatch({type: 'EDIT_PLANNER_MEAL', payload: newObjA});
        dispatch({type: 'EDIT_PLANNER_MEAL', payload: newObjB});

        onOpenMeal(`${newObjB.id}-${type}`)();
    }

    const getMealDropdown = (typeId, type, objId) => {
        let combinedId = `${objId}-${type}`;
        return <MealDropdown
                    id={typeId}
                    type={type}
                    open={openId === combinedId ? true : false}
                    dayId={objId}
                    onChooseMeal={onChooseMeal} 
                    onClick={onOpenMeal(combinedId)} 
                    onClose={onCloseMeal}
                    moveUp={moveUp}
                    moveDown={moveDown}
                    onSwitchStart={startSwitching}
                    onSwitchEnd={endSwitching}
                    switching={switching}
                    switchId={switchId}
                    switchType={switchType}
                />
    }

    const getColSpan = () => {
        let span = 3;
        if (hideBreakfast) span--;
        if (hideLunch) span--;
        if (hideDinner) span--;
        return span;
    }

    const mealsToDisplay = [];
    dailyMeals.forEach((meal, i) => {
        if (i < days) mealsToDisplay.push(meal);
    });

    return (
        <StyledComp>
            <StyledMealTable>
                <thead>
                    <tr>
                        <th><BasicButton label={<FiChevronUp/>} color='var(--button-color-normal)' width='50px' iconTop='-2px' onClick={moveStartDayUp}/></th>
                        { hideBreakfast ? null : <th>Breakfast</th> }
                        { hideLunch ? null : <th>Lunch</th> }
                        { hideDinner ? null : <th>Dinner</th> }
                    </tr>
                </thead>
                <tbody>
                {
                    mealsToDisplay.map(obj => {
                        return (
                            <tr key={`meal-${obj.id}`}>
                                <td>{obj.day}</td>
                                { hideBreakfast ? null : <td>{getMealDropdown(obj.breakfastId, 'Breakfast', obj.id)}</td> }
                                { hideLunch ? null : <td>{getMealDropdown(obj.lunchId, 'Lunch', obj.id)}</td> }
                                { hideDinner ? null : <td>{getMealDropdown(obj.dinnerId, 'Dinner', obj.id)}</td> }
                            </tr>
                        );
                    })
                }
                    <tr className='hidden'>
                        <td><BasicButton label={<FiChevronDown/>} color='var(--button-color-normal)' width='50px' iconTop='-2px' onClick={moveStartDayDown}/></td>
                        <td colSpan={getColSpan()}>Total Cost: {parseCurrency(totalCost())}</td>
                    </tr>
                </tbody>
            </StyledMealTable>
        </StyledComp>
    );
}

export default Planner;