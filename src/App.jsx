import { useSelector } from 'react-redux';
import './App.css'
import AccountOperations from './features/accounts/AccountOperations';
import BalanceDisplay from './features/accounts/BalanceDisplay';
import CreateCustomer from './features/customers/CreateCustomer';
import Customer from './features/customers/Customer';

function App() {
  const fullName = useSelector(state => state.customer.fullName);

  return (
    <>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName === '' ? 
        (<CreateCustomer />) :
        (
        <>  
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
        )}
    </>
  )
}

export default App
