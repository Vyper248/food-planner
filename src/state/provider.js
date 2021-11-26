import { useReducer, useEffect } from "react";
import { format } from "date-fns";

import Context from "./context";

const initialState = {
    meals: [],
    items: [],
    planner: {},
    shoppingList: {}
};

const reducer = (state={}, action) => {
    let value = action.payload;
    switch(action.type) {
        case 'ADD_ITEM': return {...state, items: addToArray(value, state.items)};
        case 'EDIT_ITEM': return {...state, items: editArray(value, state.items)};
        case 'DELETE_ITEM': return {...state, items: removeFromArray(value, state.items)};

        case 'ADD_MEAL': return {...state, meals: addToArray(value, state.meals)};
        case 'EDIT_MEAL': return {...state, meals: editArray(value, state.meals)};
        case 'DELETE_MEAL': return {...state, meals: removeFromArray(value, state.meals)};

        case 'RESTORE_LOCAL': return {...state, ...value};

        default: return state;
    }
}

const addToArray = (obj, arr) => {
    obj.id = getID();
    return [...arr, obj];
}

const editArray = (obj, arr) => {
    return arr.map(item => item.id === obj.id ? obj : item);
}

const removeFromArray = (obj, arr) => {
    return arr.filter(item => item.id === obj.id ? false : true);
}

const getID = () => {
    return format(new Date(), 'T');
}

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //restoring state from local storage
    useEffect(() => {
        let restoredState = localStorage.getItem('food-planner-state');
        if (!restoredState) restoredState = initialState;
        else restoredState = JSON.parse(restoredState);

        dispatch({type: 'RESTORE_LOCAL', payload: restoredState});
    }, []);

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