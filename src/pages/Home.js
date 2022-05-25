import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { TiArrowUnsorted } from 'react-icons/ti';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import context from '../state/context';

import StyledMealTable from '../components/Styled/StyledMealTable';
import MealDropdown from '../containers/MealDropdown';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import BasicButton from '../components/BasicButton';

const StyledComp = styled.div`

`

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getNextDay = (day) => {
    let dayIndex = daysOfWeek.indexOf(day) + 1;
    let nextDay = daysOfWeek[dayIndex%7];
    return nextDay;
}

const getNextID = (dailyMeals) => {
    if (dailyMeals.length === 0) return 1;

    let highestID = dailyMeals.reduce((a,c) => {
        if (c.id > a) return c.id;
        return a;
    }, 0);

    if (highestID === undefined) return 1;

    return highestID+1;
}

const addMeals = (planner) => {
    let { days, startDay, dailyMeals } = planner;

    if (days < 7) days = 7;

    let currentDays = dailyMeals.length;
    let latestMeal = dailyMeals[dailyMeals.length-1];
    let latestDay = startDay;
    let latestID = getNextID(dailyMeals);

    if (latestMeal !== undefined) latestDay = getNextDay(latestMeal.day);

    let newMeals = [...dailyMeals];
    
    for (let i = 0; i < days-currentDays; i++) {
        newMeals.push({id: latestID, day: latestDay, breakfastId: 0, lunchId: 0, dinnerId: 0});
        latestDay = getNextDay(latestDay);
        latestID++;
    }

    return newMeals;
}

const trimMeals = (dailyMeals, days) => {
    let newArray = [...dailyMeals];
    if (newArray.length > days) {
        if (days < 7) days = 7;
        newArray = dailyMeals.slice(0,days);
    }
    return newArray;
}

const Home = () => {
    const { planner, meals, switchId, switchType, dispatch } = useContext(context);
    const { days, people, showCalories, dailyMeals } = planner;
    const [ openId, setOpenId ] = useState(0);

    const onChangeDays = (value) => {
        if (value > 3) value = 3;
        if (value < 1) value = 1;
        dispatch({type: 'SET_DAYS', payload: value*7});
    }

    const onChangeShowCalories = (value) => {
        dispatch({type: 'SET_SHOW_CALORIES', payload: value});
    }

    const breakfastMeals = meals.filter(meal => meal.type === 'Breakfast');
    const lunchMeals = meals.filter(meal => meal.type === 'Lunch');
    const dinnerMeals = meals.filter(meal => meal.type === 'Dinner');

    breakfastMeals.unshift({id: 0, name: 'Empty'});
    lunchMeals.unshift({id: 0, name: 'Empty'});
    dinnerMeals.unshift({id: 0, name: 'Empty'});

    //check to make sure displaying the correct number of days
    useEffect(() => {
        let newMeals = [];

        if (dailyMeals.length < days) newMeals = addMeals(planner);
        else if (dailyMeals.length > days) newMeals = trimMeals(dailyMeals, days);
        else return;

        dispatch({type: 'SET_DAILY_MEALS', payload: newMeals});
    }, [days]);

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
        dispatch({type: 'SET_SWITCHING', payload: true});
        dispatch({type: 'SET_SWITCH_ID', payload: dayId});
        dispatch({type: 'SET_SWITCH_TYPE', payload: type});
        onCloseMeal();
    }

    const endSwitching = (dayId, typeKey) => {
        if (switchId === dayId) {
            dispatch({type: 'SET_SWITCHING', payload: false});
            return;
        }

        let objA = dailyMeals.find(obj => obj.id === switchId);
        let objB = dailyMeals.find(obj => obj.id === dayId);

        swapObjects(objA, objB, typeKey, switchType);
        dispatch({type: 'SET_SWITCHING', payload: false});
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

    const moveStartDayUp = () => {
        let newArray = [...dailyMeals];
        let lastItem = newArray.pop();
        newArray.unshift(lastItem);
        dispatch({type: 'SET_DAILY_MEALS', payload: newArray});
    }

    const moveStartDayDown = () => {
        let newArray = [...dailyMeals];
        let firstItem = newArray.shift();
        newArray.push(firstItem);
        dispatch({type: 'SET_DAILY_MEALS', payload: newArray});
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
                />
    }

    const mealsToDisplay = [];
    dailyMeals.forEach((meal, i) => {
        if (i < days) mealsToDisplay.push(meal);
    });

    return (
        <StyledComp>
            <h3>Planner</h3>
            <Input type='number' labelText='Number of Weeks' value={days/7} onChange={onChangeDays} min={1} max={3}/>
            <Input type='checkbox' labelText='Show Calories' value={showCalories} onChange={onChangeShowCalories}/>
            <br/>
            <StyledMealTable>
                <thead>
                    <tr>
                        <th><BasicButton label={<FiChevronUp/>} width='50px' onClick={moveStartDayUp}/></th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
                {
                    mealsToDisplay.map(obj => {
                        return (
                            <tr key={`meal-${obj.id}`}>
                                <td>{obj.day}</td>
                                <td>{getMealDropdown(obj.breakfastId, 'Breakfast', obj.id)}</td>
                                <td>{getMealDropdown(obj.lunchId, 'Lunch', obj.id)}</td>
                                <td>{getMealDropdown(obj.dinnerId, 'Dinner', obj.id)}</td>
                            </tr>
                        );
                    })
                }
                    <tr className='hidden'>
                        <td><BasicButton label={<FiChevronDown/>} width='50px' onClick={moveStartDayDown}/></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </StyledMealTable>
        </StyledComp>
    );
}

export default Home;