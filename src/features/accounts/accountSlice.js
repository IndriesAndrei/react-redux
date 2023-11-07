// a slice is a part of the total state
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};

// Redux Toolkit slice
const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        // account/deposit
        deposit(state, action) {
            // we mutate the balance property
            state.balance = state.balance + action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance = state.balance - action.payload;
        },
        requestLoan: {
            // prepare the data, so it can accept 2 arguments
            prepare(amount, purpose) {
                return {
                    payload: {amount, purpose},
                }
            },

            reducer(state, action) {
                if (state.loan > 0) return;

                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + action.payload.amount
            },
        },
        payLoan(state) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = '';
        },
        convertingCurrency(state) {
            state.isLoading = true;
        }
    }
});

export const {withdraw, requestLoan, payLoan} = accountSlice.actions;

// using thunks in Redux Toolkit
export function deposit(amount, currency) {
    if (currency === "USD") return {type: "account/deposit", payload: amount};

    // Middleware Thunk (between dispatching and the store)
    return async function(dispatch, getState) {
        dispatch({type: "account/convertingCurrency"});

        // API call
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const converted = data.rates.USD;

        // dispatch action to the store
        dispatch({type: "account/deposit", payload: converted});
    };
}

export default accountSlice.reducer;


/* old Redux way
// reducer function (logic inside)
export default function accountReducer(state = initialState, action) {
    switch(action.type) {
        // state domain / event name
        case 'account/deposit':
            return { ...state, balance: state.balance + action.payload, isLoading: false };
        case 'account/withdraw':
            return { ...state, balance: state.balance - action.payload };
        case 'account/requestLoan':
            if(state.loan > 0) return state;
            return { 
                ...state, 
                loan: action.payload.amount, 
                loanPurpose: action.payload.purpose, 
                balance: state.balance + action.payload.amount
            };
        case 'account/payLoan':
            return { 
                ...state, 
                loan: 0, 
                loanPurpose: '', 
                balance: state.balance - state.loan 
            };
        case 'account/covertingCurrency':
            return {...state, isLoading: true};
        default:
            return state;
    }
}



// ========== action creators -> are simply functions that return actions
export function deposit(amount, currency) {
    if (currency === "USD") return {type: "account/deposit", payload: amount};

    // Middleware Thunk (between dispatching and the store)
    return async function(dispatch, getState) {
        dispatch({type: "account/convertingCurrency"});

        // API call
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const converted = data.rates.USD;

        // dispatch action to the store
        dispatch({type: "account/deposit", payload: converted});
    };
}

export function withdraw(amount) {
    return {type: 'account/withdraw', payload: amount};
}

export function requestLoan(amount, purpose) {
    return {type: 'account/requestLoan', payload: {amount: amount, purpose: purpose}};
}

export function payLoan() {
    return {type: 'account/payLoan'};
}
*/

