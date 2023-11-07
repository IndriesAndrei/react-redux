// Redux simple without React
import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

// creating the Redux store
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

// old way with Redux
const store = createStore(rootReducer, applyMiddleware(thunk));

// new way with Redux Toolkit
configureStore

export default store;