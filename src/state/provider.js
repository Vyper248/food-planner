import { useReducer } from "react";
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
        case 'ADD_MEAL': return {...state, meals: addToArray(value, state.meals)};
        default: return state;
    }
}

const addToArray = (obj, arr) => {
    return [...arr, obj];
}

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <Context.Provider value={{ ...state, dispatch}}>
            { children }
        </Context.Provider>
    )
}

export default Provider;