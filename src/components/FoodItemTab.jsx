import { useMemo } from 'react';
import { FaTrash } from 'react-icons/fa6';
import { IoMdMore } from 'react-icons/io';

import { daysBetween } from '../utils';

const FoodItemTab = ({ foodItem }) => {
  const { name, expiryDate } = foodItem;

  const expiry_date = new Date(expiryDate);
  const todayDate = useMemo(() => new Date(), []);
  const isExpired = useMemo(() => todayDate > expiry_date, [todayDate, expiry_date]);
  const daysToExpiry = useMemo(() => daysBetween(expiry_date, todayDate), [todayDate, expiry_date]);

  const text = useMemo(() => {
    if (isExpired) {
      return `Expired ${daysToExpiry} days ago`;
    } else if (daysToExpiry >= 1) {
      return `Fresh for ${daysToExpiry} days`;
    } else {
      return 'Expired today';
    }
  }, [isExpired, daysToExpiry]);

  return (
    <div
      className={`p-2.5 h-20 bg-white rounded-md grid grid-flow-col grid-cols-[20px_1fr_20px] grid-rows-2 border-[10px] ${
        isExpired ? 'border-red-100' : 'border-green-100'
      }`}>
      <div className='row-start-1 row-end-3 place-self-center' />
      <p className='font-semibold'>{name}</p>
      <p className={`text-sm ${isExpired ? 'text-red-500' : 'text-green-500'}`}>{text}</p>
      <div className='row-start-1 row-end-3'>
        {isExpired ? (
          <FaTrash className='w-full h-full place-self-center cursor-pointer text-gray-400' />
        ) : (
          <IoMdMore className='w-full h-full place-self-center cursor-pointer text-gray-400' />
        )}
      </div>
    </div>
  );
};

export default FoodItemTab;
