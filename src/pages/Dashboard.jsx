import { Link } from 'react-router-dom';
import { FaGear } from 'react-icons/fa6';
import { useContext, useMemo } from 'react';

import { MainContext } from '../layouts/MainLayout';
import FoodItemTab from '../components/FoodItemTab';
import FoodItemInfo from '../components/FoodItemInfo';

const Dashboard = () => {
  const {
    currentUser: { name = '', foodItems = [] },
  } = useContext(MainContext);

  const todayDate = useMemo(() => Date.now(), []);
  const upcomingExpiries = useMemo(() => {
    const sortedFoodItems = [...foodItems];
    sortedFoodItems.sort(
      (a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
    );

    return sortedFoodItems;
  }, [foodItems]);

  return (
    <div className='py-8 px-4'>
      <header className='flex justify-between'>
        <h1 className='font-semibold text-3xl mb-8'>Welcome, {name}!</h1>
        <Link to='/dashboard/settings'>
          <FaGear />
        </Link>
      </header>

      <section className='main-section'>
        <p className='section-heading'>Upcoming Expiries</p>
        <div className='flex gap-3'>
          {upcomingExpiries.slice(0, 3).map((foodItem, index) => (
            <FoodItemInfo key={index} foodItem={foodItem} />
          ))}
        </div>
      </section>

      <section className='main-section'>
        <p className='section-heading'>Expired Items</p>
        <div className='flex flex-col gap-3'>
          {foodItems
            .filter(({ expiryDate }) => todayDate >= new Date(expiryDate).getTime())
            .map((foodItem, index) => (
              <FoodItemTab key={index} foodItem={foodItem} />
            ))}
        </div>
      </section>

      <section className='main-section'>
        <p className='section-heading'>Active Inventory</p>
        <div className='flex flex-col gap-3'>
          {foodItems
            .filter(({ expiryDate }) => todayDate < new Date(expiryDate).getTime())
            .map((foodItem, index) => (
              <FoodItemTab key={index} foodItem={foodItem} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
