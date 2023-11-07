import { useSelector } from "react-redux";

export default function Customer() {
    // read data from Redux store, useSelector is subscribed to the store, and when store changes, this component re-renders
    const customer = useSelector((store) => store.customer.fullName);
    console.log(customer);

    return <h2>👋 Welcome, {customer}</h2>;
}