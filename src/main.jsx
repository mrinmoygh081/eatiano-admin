import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthProvider from './context/authContext';
import RestaurantsProvider from './context/restaurantsContext';
import AgentsProvider from './context/deliveryContext';
import ExpenseProvider from './context/expensesContext';

ReactDOM.render(
  <AuthProvider>
    <RestaurantsProvider>
      <AgentsProvider>
        <ExpenseProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ExpenseProvider>
      </AgentsProvider>
    </RestaurantsProvider>
  </AuthProvider>,
  document.getElementById('root')
);
