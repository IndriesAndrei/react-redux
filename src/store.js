// Redux simple without React
import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import thunk from "redux-thunk";

// creating the Redux store
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;