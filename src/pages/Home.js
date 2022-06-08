import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import context from '../state/context';

import Input from '../components/Input';
import Planner from '../containers/Planner';
import ConfirmationPopup from '../components/ConfirmationPopup';


const StyledComp = styled.div`
    & div#weekDiv {
        display: inline-block;
        position: relative;
    }
    
    & div#plannerDiv {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
`

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const getNextDay = (day) => {
    let dayIndex = daysOfWeek.indexOf(day) + 1;
    let nextDay = daysOfWeek[dayIndex%7];
    return nextDay;
}

const getNextID = (dailyMeals) => {
    let highestID = 1;
    dailyMeals.forEach(peopleMeals => {
        peopleMeals.forEach(meal => {
            if (meal.id > highestID) highestID = meal.id;
        });
    });
    return highestID+1;
}

const addMeals = (personMeals, days, dailyMeals) => {
    if (days < 7) days = 7;
    if (days > 21) days = 21;

    let latestDay = personMeals[personMeals.length-1].day;
    latestDay = getNextDay(latestDay);
    let latestID = getNextID(dailyMeals);
    let currentDays = personMeals.length;
    let newMeals = [...personMeals];

    for (let i = 0; i < days-currentDays; i++) {
        newMeals.push({id: latestID, day: latestDay, breakfastId: 0, lunchId: 0, dinnerId: 0});
        latestDay = getNextDay(latestDay);
        latestID++;
    }

    return newMeals;
}

const trimMeals = (personMeals, days) => {
    let newArray = [...personMeals];
    if (newArray.length > days) {
        if (days < 7) days = 7;
        newArray = personMeals.slice(0,days);
    }
    return newArray;
}

const getBlankMealPlanner = (firstDay, days, dailyMeals) => {
    let newMealPlanner = [];
    let nextID = getNextID(dailyMeals);
    let nextDay = firstDay;
    for (let i = 0; i < days; i++) {
        newMealPlanner.push({
            id: nextID++,
            day: nextDay,
            breakfastId: 0,
            lunchId: 0,
            dinnerId: 0
        });
        nextDay = getNextDay(nextDay);
    }
    return newMealPlanner;
}

const Home = () => {
    const { planner, dispatch } = useContext(context);
    const { days, people, showCalories, dailyMeals } = planner;
    const [ weekWarning, setWeekWarning ] = useState({show: false, value: 1});

    const onChangeDays = (value) => {
        if (value > 3) value = 3;
        if (value < 1) value = 1;

        //warn if going to change down, because it will remove items
        if (value < days/7) {
            setWeekWarning({show: true, value: value});
            return;
        }

        dispatch({type: 'SET_DAYS', payload: value*7});
    }

    const onConfirmWeekChange = () => {
        let value = weekWarning.value;
        dispatch({type: 'SET_DAYS', payload: value*7});
        setWeekWarning({show: false, value: 1});
    }

    const onCancelWeekChange = () => {
        setWeekWarning({show: false, value: 1});
    }

    const onChangeShowCalories = (value) => {
        dispatch({type: 'SET_SHOW_CALORIES', payload: value});
    }

    const onChangePeople = (value) => {
        if (value < 1) value = 1;
        let currentPeople = dailyMeals.length;
        let firstPlanner = dailyMeals[0];
        let firstDay = firstPlanner[0].day;
        let newArray = [...dailyMeals];

        if (currentPeople < value) {
            for (let i = currentPeople; i < value; i++) {
                let newMealPlanner = getBlankMealPlanner(firstDay, days, dailyMeals);
                newArray.push(newMealPlanner);
            }
        } else if (currentPeople > value) {
            for (let i = value; i < currentPeople; i++) {
                newArray.pop();
            }
        }

        dispatch({type: 'SET_NUMBER_PEOPLE', payload: value});
        dispatch({type: 'SET_DAILY_MEALS', payload: newArray});
    }

    //check to make sure displaying the correct number of days
    useEffect(() => {
        let newMeals = [];

        for (let i = 0; i < people; i++) {
            let newPeopleMeals = [];
            let peopleMeals = dailyMeals[i];
            if (peopleMeals.length < days) newPeopleMeals = addMeals(peopleMeals, days, [...dailyMeals, ...newMeals]);
            else if (peopleMeals.length > days) newPeopleMeals = trimMeals(peopleMeals, days);
            else newPeopleMeals = peopleMeals;
            newMeals.push(newPeopleMeals);
        }

        dispatch({type: 'SET_DAILY_MEALS', payload: newMeals});
    }, [days]);

    return (
        <StyledComp>
            <h3>Planner</h3>
            <div id='weekDiv'>
                <Input type='number' labelText='Number of Weeks' value={days/7} onChange={onChangeDays} min={1} max={3}/>
                {
                    weekWarning.show === true 
                        ? <ConfirmationPopup 
                                message='Doing this will permanently remove any meals in the week being removed. Are you sure you want to continue?'
                                onConfirm={onConfirmWeekChange} 
                                onCancel={onCancelWeekChange}
                            />  
                        : <div></div>
                }
            </div>
            <Input type='number' labelText='Number of People' value={people} onChange={onChangePeople} min={1} max={3}/>
            <Input type='checkbox' labelText='Show Calories' value={showCalories} onChange={onChangeShowCalories}/>
            <br/>
            <div id='plannerDiv'>
                {
                    dailyMeals.map((personMeals, i) => {
                        return (<div key={'planner-'+i}><Planner dailyMeals={personMeals} allMeals={dailyMeals}/></div>)
                    })
                }
            </div>
        </StyledComp>
    );
}

export default Home;