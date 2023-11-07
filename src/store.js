// Redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// the store in React Toolkit
const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    }
})

export default store;