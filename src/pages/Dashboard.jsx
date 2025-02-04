import { Link } from 'react-router-dom';
import { FaGear } from 'react-icons/fa6';
import { useEffect, useMemo, useState } from 'react';
// import { MainContext } from '../layouts/MainLayout';
import FoodItemTab from '../components/FoodItemTab';
import FoodItemInfo from '../components/FoodItemInfo';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // const {
  //   currentUser: { "Promyz" = '', foodItems = [] },
  // } = useContext(MainContext);
  const navigate = useNavigate();
  const [items, setItems] = useState({ active: [], upcoming: [], expired: [] });

  const todayDate = useMemo(() => Date.now(), []);
  // const upcomingExpiries = useMemo(() => {
  //   const sortedFoodItems = [...foodItems];
  //   sortedFoodItems.sort(
  //     (a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
  //   );

  //   return sortedFoodItems;
  // }, [foodItems]);

  async function handleFetchDashboard() {
    try {
      const currentUser = sessionStorage.getItem('currentUser');

      if (!currentUser) {
        navigate('/login');
        return;
      }

      const response = await fetch(
        `https://freshtrackapi.onrender.com/api/dashboard/${currentUser}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Dashboard fetch failed: ${response.statusText}`);
      }
      const data = await response.json();
      const today = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);
  
      const groupedData = { active: [], upcoming: [], expired: [] };
      Object.entries(data.items).forEach(([itemName, items]) => {
        items.forEach(({ id, expiryDate }) => {
          const expiry = new Date(expiryDate);
          const itemData = { id, itemName, expiryDate };
  
          if (expiry < today) {
            groupedData.expired.push(itemData);
          } else if (expiry >= today && expiry <= sevenDaysFromNow) {
            groupedData.upcoming.push(itemData);
          } else {
            groupedData.active.push(itemData);
          }
        });
      });
  
      setItems(groupedData);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    (async () => {
      await handleFetchDashboard();
    })();
  }, []);

  return (
      <div className="py-8 px-4">
    <header className="flex justify-between">
      <h1 className="font-semibold text-3xl mb-8">Welcome, {"Promyz"}!</h1>
      <Link to="/dashboard/settings">
        <FaGear />
      </Link>
    </header>
    <section className="main-section">
      <p className="section-heading">Upcoming Expiries</p>
      <div className="flex flex-col gap-3">
        {items.upcoming.length > 0 ? (
          items.upcoming.map((item, index) => (
            <FoodItemTab key={item.id} foodItem={item} />
          ))
        ) : (
          <p>No upcoming expiries</p>
        )}
      </div>
    </section>

    <section className="main-section">
      <p className="section-heading">Expired Items</p>
      <div className="flex flex-col gap-3">
        {items.expired.length > 0 ? (
          items.expired.map((item, index) => (
            <FoodItemTab key={index} foodItem={item} />
          ))
        ) : (
          <p>No expired items</p>
        )}
      </div>
    </section>
    <section className="main-section">
      <p className="section-heading">Active Inventory</p>
      <div className="flex flex-col gap-3">
        {items.active.length > 0 ? (
          items.active.map((item, index) => (
            <FoodItemTab key={index} foodItem={item} />
          ))
        ) : (
          <p>No active inventory</p>
        )}
      </div>
    </section>
  </div>
  );
};

export default Dashboard;