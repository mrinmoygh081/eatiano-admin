import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Restaurants } from '../../context/restaurantsContext';
import DashboardCard from '../UI/DashboardCard';
import { Agents } from '../../context/deliveryContext';
import { Expenses } from '../../context/expensesContext';

const DashboardStats = () => {
  const restaurantsCtx = useContext(Restaurants);
  const restaurants = restaurantsCtx.allRestaurants;

  const agentsCtx = useContext(Agents);
  const agents = agentsCtx.allAgents;

  const expensesCtx = useContext(Expenses);
  const expenses = expensesCtx.expenses;

  return (
    <div className='container grid gap-8 mt-16 font-rubik md:grid-cols-2 lg:grid-cols-4 md:place-content-center place-items-center md:mt-24 lg:mt-32'>
      <Link
        to='/restaurants'
        className='w-full transition-all duration-200 bg-red-100 shadow-lg rounded-xl py-14 hover:-translate-y-3'
      >
        <DashboardCard
          figures={restaurants.length}
          figureStyle='text-4xl lg:text-5xl font-semibold mb-3 md:mb-5 text-red-900 text-center'
          type='Restaurants'
          typeStyle='text-xl lg:text-2xl text-red-700 text-center font-medium'
        />
      </Link>

      <Link
        to='/deliveryAgents'
        className='w-full transition-all duration-200 bg-blue-100 shadow-lg rounded-xl py-14 hover:-translate-y-3'
      >
        <DashboardCard
          figures={agents.length}
          figureStyle='text-4xl lg:text-5xl font-semibold mb-3 md:mb-5 text-blue-900 text-center'
          type='Delivery Partners'
          typeStyle='text-xl lg:text-2xl text-blue-700 text-center font-medium'
        />
      </Link>

      <Link
        to='/expenses'
        className='w-full transition-all duration-200 bg-red-100 shadow-lg rounded-xl py-14 hover:-translate-y-3'
      >
        <DashboardCard
          figures={expenses.length}
          figureStyle='text-4xl lg:text-5xl font-semibold mb-3 md:mb-5 text-red-900 text-center'
          type='Expenses'
          typeStyle='text-xl lg:text-2xl text-red-700 text-center font-medium'
        />
      </Link>
    </div>
  );
};

export default DashboardStats;
