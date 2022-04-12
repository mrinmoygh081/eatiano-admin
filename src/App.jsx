import { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ScrollToTop from './components/utilities/ScrollToTop';
import Signin from './pages/Signin';
import { Auth } from './context/authContext';
import Navbar from './components/UI/Navbar';
import Dashboard from './pages/Dashboard';
import Error404 from './pages/Error404';
import ForgotPassword from './pages/ForgotPassword';
import CheckOTP from './pages/CheckOTP';
import AllRestaurants from './components/restaurants/AllRestaurants';
import AddRestaurant from './components/restaurants/addRestaurant/AddRestaurant';
import EditRestaurant from './components/restaurants/editRestaurant/EditRestaurant';
import AllProducts from './components/products/AllProducts';
import AddProduct from './components/products/addProduct/AddProduct';
import EditProduct from './components/products/editProduct/EditProduct';
import SetNewPassword from './pages/SetNewPassword';
import AllDeliveryAgents from './components/delivery/AllDeliveryAgents';
import AddDelivery from './components/delivery/addDelivery/AddDelivery';
import AllExpenses from './components/expenses/AllExpenses';
import AddExpense from './components/expenses/addExpense/AddExpense';

const App = () => {
  const authCtx = useContext(Auth);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Router>
      <Navbar />
      <ScrollToTop>
        <Routes>
          {isLoggedIn && <Route path='/' element={<Dashboard />} />}
          {!isLoggedIn && <Route path='/signin' element={<Signin />} />}
          {!isLoggedIn && (
            <Route
              path='/'
              element={<Navigate replace={true} to='/signin' />}
            />
          )}
          {isLoggedIn && (
            <Route
              path='/signin'
              element={<Navigate replace={true} to='/' />}
            />
          )}

          <Route path='*' element={<Error404 />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/checkOTP' element={<CheckOTP />} />
          <Route path='/setNewPassword' element={<SetNewPassword />} />
          <Route path='/restaurants' element={<AllRestaurants />} />
          <Route path='/expenses' element={<AllExpenses />} />
          <Route path='/expenses/add' element={<AddExpense />} />
          <Route path='/deliveryAgents' element={<AllDeliveryAgents />} />
          <Route path='/restaurantProducts/:id' element={<AllProducts />} />
          <Route path='/restaurants/add' element={<AddRestaurant />} />
          <Route path='/deliveryAgents/add' element={<AddDelivery />} />
          <Route path='/restaurantProducts/add/:id' element={<AddProduct />} />
          <Route path='/editRestaurant/:id' element={<EditRestaurant />} />
          <Route path='/editProduct/:id' element={<EditProduct />} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;
