import { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';

import context from '../state/context';

import List from './List';
import BasicButton from './BasicButton';

const StyledComp = styled.div`
    position: relative;
    transition: 0.3s;

    & > div#name {
        height: 35px;
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

            li:hover {
                cursor: pointer;
                background-color: #EEE;
            }
        }
    }

`

const MealDropdown = ({id, type, open, dayId, onChooseMeal, onClick, onClose, moveUp, moveDown, onSwitchStart, onSwitchEnd}) => {
    const { meals, switching, switchId, switchType, dispatch } = useContext(context);

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

    const thisMeal = meals.find(obj => obj.id === id);

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

    const onClickName = () => {
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
            <div id='name' className={switchingClass} onClick={onClickName}>{thisMeal?.name}</div>
            { open ? 
                <div id='dropdown' ref={ref}>
                    <h4>Choose a Meal</h4>
                    <div>
                        <BasicButton label='Up' onClick={onUp} width='50px'/>
                        <BasicButton label='Down' onClick={onDown} width='60px'/>
                        <BasicButton label='Switch' onClick={onClickSwitch} width='70px'/>
                        <BasicButton label='Clear' onClick={onClearMeal} width='70px'/>
                    </div>
                    <List>
                    {
                        mealsOfType.map((obj,i) => {
                            return (
                                <li key={obj.id} onClick={onClickMeal(obj.id)}>{obj.name}</li>
                            );
                        })
                    }
                    </List>
                </div> 
            : null }
        </StyledComp>
    );
}

export default MealDropdown;