import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { TiArrowUnsorted } from 'react-icons/ti';

import context from '../state/context';

import StyledMealTable from '../components/Styled/StyledMealTable';
import MealDropdown from '../components/MealDropdown';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';

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

const sequenceDays = (dailyMeals, startDay) => {
    let dayIndex = daysOfWeek.indexOf(startDay);
    dailyMeals.forEach(meal => {
        meal.day = daysOfWeek[dayIndex%7];
        dayIndex++;
    });
}

const organisePlanner = (planner) => {
    let { days, startDay, dailyMeals } = planner;

    if (dailyMeals.length === 0) return dailyMeals;

    //trim extra days that aren't needed
    let newArray = [...dailyMeals];
    if (dailyMeals.length > days) {
        if (days < 7) days = 7;
        newArray = dailyMeals.slice(0,days);
    }

    //if first day is correct, don't need to do anything else
    let firstDay = newArray[0].day;
    if (firstDay === startDay) return newArray;

    if (firstDay !== startDay) {
        //find first day that matches start day
        let indexOfStartDay = 0;
        for (let i = 0; i < 7; i++) {
            let meal = newArray[i];
            if (meal.day === startDay) {
                indexOfStartDay = i;
                break;
            }
        }

        //split array and reorganise days
        let daysFromStart = newArray.slice(indexOfStartDay);
        let daysBeforeStart = newArray.slice(0, indexOfStartDay);
        newArray = [...daysFromStart, ...daysBeforeStart];    
    }

    //make sure days are still sequential - matters when days is not a multiple or 7
    sequenceDays(newArray, startDay);

    return newArray;
}

const Home = () => {
    const { planner, meals, switching, switchId, switchType, dispatch } = useContext(context);
    const { days, startDay, people, showCalories, dailyMeals } = planner;
    const [ openId, setOpenId ] = useState(0);

    const onChangeStartDay = (value) => {
        dispatch({type: 'SET_START_DAY', payload: value});
    }

    const onChangeDays = (value) => {
        dispatch({type: 'SET_DAYS', payload: value});
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
        else newMeals = organisePlanner(planner);

        dispatch({type: 'SET_DAILY_MEALS', payload: newMeals});
    }, [days]);

    //check to make sure displaying from the correct start day
    useEffect(() => {
        let newMeals = organisePlanner(planner);

        dispatch({type: 'SET_DAILY_MEALS', payload: newMeals});
    }, [startDay]);

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
            <Dropdown labelText='Start Day' value={startDay} options={daysOfWeek} onChange={onChangeStartDay}/>
            <Input type='number' labelText='Number of Days' value={days} onChange={onChangeDays} min={7} max={21}/>
            <br/>
            <StyledMealTable>
                <thead>
                    <tr>
                        <th></th>
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
                </tbody>
            </StyledMealTable>
        </StyledComp>
    );
}

export default Home;