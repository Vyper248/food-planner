import { useEffect, useContext } from 'react';
import styled from 'styled-components';

import context from '../state/context';

import Input from '../components/Input';
import Planner from '../containers/Planner';

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

const addMeals = (dailyMeals, days) => {
    if (days < 7) days = 7;
    if (days > 21) days = 21;

    let latestDay = dailyMeals[dailyMeals.length-1].day;
    latestDay = getNextDay(latestDay);
    let latestID = getNextID(dailyMeals);
    let currentDays = dailyMeals.length;
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
    const { planner, dispatch } = useContext(context);
    const { days, people, showCalories, dailyMeals } = planner;

    console.log(planner);

    const onChangeDays = (value) => {
        if (value > 3) value = 3;
        if (value < 1) value = 1;
        dispatch({type: 'SET_DAYS', payload: value*7});
    }

    const onChangeShowCalories = (value) => {
        dispatch({type: 'SET_SHOW_CALORIES', payload: value});
    }

    //check to make sure displaying the correct number of days
    useEffect(() => {
        let newMeals = [];

        if (dailyMeals.length < days) newMeals = addMeals(dailyMeals, days);
        else if (dailyMeals.length > days) newMeals = trimMeals(dailyMeals, days);
        else return;

        dispatch({type: 'SET_DAILY_MEALS', payload: newMeals});
    }, [days]);

    return (
        <StyledComp>
            <h3>Planner</h3>
            <Input type='number' labelText='Number of Weeks' value={days/7} onChange={onChangeDays} min={1} max={3}/>
            <Input type='checkbox' labelText='Show Calories' value={showCalories} onChange={onChangeShowCalories}/>
            <br/>
            <Planner dailyMeals={dailyMeals}/>
        </StyledComp>
    );
}

export default Home;