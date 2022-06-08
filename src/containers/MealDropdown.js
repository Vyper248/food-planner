import { useContext, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import context from '../state/context';

import { sortArray } from '../functions';

import List from '../components/List';
import BasicButton from '../components/BasicButton';

const StyledComp = styled.div`
    position: relative;
    transition: 0.3s;
    height: 100%;

    & > div#name {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 7px 10px;
        transition: 0.3s;
        border: 1px solid transparent;
        outline: 1px solid transparent;
        outline-offset: 0px;
        ${props => props.open ? 'border: 1px solid blue;' : ''};

        :hover {
            cursor: pointer;
        }
    }

    & div#meal {
        display: flex;
        height: 100%;
        align-items: center;
    }

    & div#calories {
        font-size: 0.8em;
        color: gray;
        position: relative;
        top: 5px;
    }

    & > div#name.switching {
        transition: 0.3s;
        outline: 1px solid #AAA;
        outline-offset: -3px;

        :hover {
            background-color: #CCC;
        }
    }

    & > div#name.switchTarget {
        border: 1px solid blue;
        transition: 0.3s;
    }

    & > div.notSwitching {
        background-color: #DDD;
        color: #AAA;
        cursor: not-allowed !important;
        transition: 0.3s;
    }

    & > div#dropdown {
        position: absolute;
        background-color: white;
        border: 1px solid blue;
        width: 300px;
        left: 50%;
        top: calc(100% - 1px);
        transform: translateX(-50%);
        z-index: 2;

        h4 {
            margin: 5px;
        }

        ul {
            width: calc(100% - 10px);
            max-height: 260px;
            overflow: scroll;

            li:hover {
                cursor: pointer;
                background-color: #EEE;
            }
        }
    }

    & > div#dropdown.above {
        top: auto;
        bottom: calc(100% - 1px);
    }

`

const MealDropdown = ({id, type, open, dayId, onChooseMeal, onClick, onClose, moveUp, moveDown, onSwitchStart, onSwitchEnd, switching, switchId, switchType}) => {
    const { meals, items, planner } = useContext(context);
    const [ positionAbove, setPositionAbove ] = useState(false);
    let { showCalories } = planner;
    // showCalories = false;

    //Add click outside event listener
    const ref = useRef(null);
    useEffect(() => {
        const onClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                if (open) onClose();
            }
        }

        document.addEventListener('click', onClickOutside);
        return () => {
            document.removeEventListener('click', onClickOutside);
        }
    }, [ref, open]);

    const mealsOfType = meals.filter(meal => meal.type === type);
    const sortedMealsOfType = sortArray('Name', mealsOfType);

    let totalCalories = 0;
    const thisMeal = meals.find(obj => obj.id === id);
    if (thisMeal) {
        const mealItems = thisMeal.itemList.map(item => {
            let itemObj = items.find(obj => obj.id === item.id);
            if (!itemObj) return {};
            let copy = {...itemObj, qty: item.qty};
            return copy;
        });
    
        totalCalories = mealItems.reduce((a,c) => {
            return a += parseInt(c.calories / c.size * c.qty);
        }, 0);
    }


    const getTypeKey = () => {
        let typeKey = 'breakfastId';
        if (type === 'Lunch') typeKey = 'lunchId';
        if (type === 'Dinner') typeKey = 'dinnerId';
        return typeKey;
    }

    const onClickMeal = (objId) => () => {
        let typeKey = getTypeKey();
        onChooseMeal(dayId, typeKey, objId);
        onClose();
    }

    const onClearMeal = () => {
        let typeKey = getTypeKey();
        onChooseMeal(dayId, typeKey, 0);
        onClose();
    }

    const onClickSwitch = () => {
        onSwitchStart(dayId, type);
    }

    const onUp = () => {
        moveUp(dayId, getTypeKey(), type);
    }

    const onDown = () => {
        moveDown(dayId, getTypeKey(), type);
    }

    const onClickName = (e) => {
        //When clicking item, check whether popup needs to be above or below the item, defaulting to below
        if (!open) {
            let rect = e.target.getBoundingClientRect();
            let bottom = rect.bottom;
            let listHeight = sortedMealsOfType.length * 30;
            listHeight = listHeight > 260 ? 260 : listHeight;
    
            if (bottom > window.innerHeight - 90 - listHeight) setPositionAbove(true);
            else setPositionAbove(false);
        }

        if (switching && type === switchType) {
            onSwitchEnd(dayId, getTypeKey());
            onClose();
        } else if (switching && type !== switchType) {
            return;
        } else {
            onClick();
        }
    }

    let switchingClass = type === switchType && switching ? 'switching' : '';
    if (dayId === switchId && type === switchType && switching) switchingClass = 'switchTarget';
    if (switching && type !== switchType) switchingClass = 'notSwitching';

    return (
        <StyledComp open={open}>
            <div id='name' className={switchingClass} onClick={onClickName}>
                <div id='meal'>{thisMeal?.name}</div>
                { showCalories && totalCalories > 0 ? <div id='calories'>{totalCalories}kcal</div> : null }
            </div>
            { open ? 
                <div id='dropdown' className={positionAbove ? 'above' : ''} ref={ref}>
                    <h4>Choose a Meal</h4>
                    <div>
                        <BasicButton label='Up' onClick={onUp} width='50px'/>
                        <BasicButton label='Down' onClick={onDown} width='60px'/>
                        <BasicButton label='Switch' onClick={onClickSwitch} width='70px'/>
                        <BasicButton label='Clear' onClick={onClearMeal} width='70px'/>
                    </div>
                    <List>
                    {
                        sortedMealsOfType.map((obj,i) => {
                            return (
                                <li key={obj.id} onClick={onClickMeal(obj.id)}>{obj.name}</li>
                            );
                        })
                    }
                    </List>
                    {
                        sortedMealsOfType.length === 0 ? <div style={{marginBottom: '10px'}}>No Meals Created</div> : null
                    }
                </div> 
            : null }
        </StyledComp>
    );
}

export default MealDropdown;