import { useReducer, useEffect } from "react";
import { format } from "date-fns";

import Context from "./context";

import { setColorScheme } from "../functions";

const initialState = {
    meals: [],
    items: [],
    planner: {
        days: 7,
        startDay: 'Monday',
        people: 1,
        showCalories: true,
        dailyMeals: [[
            {id: 1, day: 'Monday', breakfastId: 0, lunchId: 0, dinnerId: 0},
            {id: 2, day: 'Tuesday', breakfastId: 0, lunchId: 0, dinnerId: 0},
            {id: 3, day: 'Wednesday', breakfastId: 0, lunchId: 0, dinnerId: 0},
            {id: 4, day: 'Thursday', breakfastId: 0, lunchId: 0, dinnerId: 0},
            {id: 5, day: 'Friday', breakfastId: 0, lunchId: 0, dinnerId: 0},
            {id: 6, day: 'Saturday', breakfastId: 0, lunchId: 0, dinnerId: 0},
            {id: 7, day: 'Sunday', breakfastId: 0, lunchId: 0, dinnerId: 0},
        ]]
    },
    shoppingList: {},
    stockList: [],
    colorScheme: 'Blue',
    hideBreakfast: false,
    hideLunch: false,
    hideDinner: false
};

const reducer = (state={}, action) => {
    let value = action.payload;
    // console.log(action.type, value);
    switch(action.type) {
        case 'SET_DAYS': return {...state, planner: {...state.planner, days: value}};
        case 'SET_START_DAY': return {...state, planner: {...state.planner, startDay: value}};
        case 'SET_NUMBER_PEOPLE': return {...state, planner: {...state.planner, people: value}};
        case 'SET_SHOW_CALORIES': return {...state, planner: {...state.planner, showCalories: value}};
        case 'SET_DAILY_MEALS': return {...state, planner: {...state.planner, dailyMeals: value}};

        case 'SET_SHOPPING_LIST_ITEM_TRUE': return {...state, shoppingList: updateShoppingList(state.shoppingList, value, true)};
        case 'SET_SHOPPING_LIST_ITEM_FALSE': return {...state, shoppingList: updateShoppingList(state.shoppingList, value, false)};
        case 'CLEAR_SHOPPING_LIST': return {...state, shoppingList: {}};

        case 'ADD_STOCK': return {...state, stockList: addToArray(value, state.stockList, true)};
        case 'EDIT_STOCK': return {...state, stockList: editArray(value, state.stockList)};
        case 'DELETE_STOCK': return {...state, stockList: removeFromArray(value, state.stockList)};
        case 'CLEAR_STOCK': return {...state, stockList: []};

        case 'ADD_ITEM': return {...state, items: addToArray(value, state.items)};
        case 'EDIT_ITEM': return {...state, items: editArray(value, state.items)};
        case 'DELETE_ITEM': return {...state, items: removeFromArray(value, state.items)};

        case 'ADD_MEAL': return {...state, meals: addToArray(value, state.meals)};
        case 'EDIT_MEAL': return {...state, meals: editArray(value, state.meals)};
        case 'DELETE_MEAL': return {...state, meals: removeFromArray(value, state.meals)};

        case 'EDIT_PLANNER_MEAL': return {...state, planner: {...state.planner, dailyMeals: editDailyMeals(value, state.planner.dailyMeals)}};

        case 'SET_COLOR_SCHEME': return {...state, colorScheme: value};
        case 'SET_HIDE_BREAKFAST': return {...state, hideBreakfast: value};
        case 'SET_HIDE_LUNCH': return {...state, hideLunch: value};
        case 'SET_HIDE_DINNER': return {...state, hideDinner: value};

        case 'RESTORE_LOCAL': return {...state, ...value};

        default: return state;
    }
}

const updateShoppingList = (shoppingList, id, checked) => {
    let newShoppingList = {...shoppingList};
    newShoppingList[id] = checked;
    if (checked === false) delete newShoppingList[id];
    return newShoppingList;
}

const editDailyMeals = (obj, arr=[]) => {
    return arr.map(peopleArr => {
        return peopleArr.map(item => item.id === obj.id ? obj : item);
    });
}

const addToArray = (obj, arr=[], ignoreId=false) => {
    if (!ignoreId) obj.id = getID();
    return [...arr, obj];
}

const editArray = (obj, arr=[]) => {
    return arr.map(item => item.id === obj.id ? obj : item);
}

const removeFromArray = (obj, arr=[]) => {
    return arr.filter(item => item.id === obj.id ? false : true);
}

const getID = () => {
    return format(new Date(), 'T');
}

//restoring state from local storage
const getFromLocalStorage = () => {
    let restoredState = localStorage.getItem('food-planner-state');
    if (!restoredState) restoredState = initialState;
    else restoredState = JSON.parse(restoredState);

    if (restoredState.planner === undefined) restoredState.planner = {};
    restoredState.planner = {...initialState.planner, ...restoredState.planner};

    restoredState.switching = false;

    setColorScheme(restoredState.colorScheme);

    return restoredState;
}

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {}, getFromLocalStorage);

    //saving state to local storage when changed
    useEffect(() => {
        localStorage.setItem('food-planner-state', JSON.stringify(state));
    }, [state]);

    return (
        <Context.Provider value={{ ...state, dispatch}}>
            { children }
        </Context.Provider>
    )
}

export default Provider;