import { useMemo } from 'react';

import { daysBetween } from '../utils';

const FoodItemInfo = ({ foodItem }) => {
  const { name, expiryDate } = foodItem;

  const expiry_date = new Date(expiryDate);
  const todayDate = useMemo(() => new Date(), []);
  const hasExpired = useMemo(() => todayDate > expiry_date, [todayDate, expiry_date]);
  const daysToExpiry = useMemo(() => daysBetween(expiry_date, todayDate), [todayDate, expiry_date]);

  const color = useMemo(() => {
    if (hasExpired) {
      return 'border-red-500';
    } else if (daysToExpiry >= 5) {
      return 'border-green-500';
    } else if (daysToExpiry > 1) {
      return 'border-yellow-500';
    } else {
      return 'border-red-500';
    }
  }, [hasExpired, daysToExpiry]);

  const text = useMemo(() => {
    if (hasExpired) {
      return `Expired ${daysToExpiry} days ago`;
    } else if (daysToExpiry > 1) {
      return `Expires in ${daysToExpiry} days`;
    } else if (daysToExpiry === 1) {
      return 'Expires tomorrow';
    } else {
      return 'Expired today';
    }
  }, [hasExpired, daysToExpiry]);

  return (
    <div
      className={`p-2.5 flex-1 h-20 bg-white rounded-md grid grid-flow-col grid-cols-[1fr_20px] grid-rows-2 border-l-4 ${color}`}>
      <p className='font-semibold'>{name}</p>
      <p>{text}</p>
      <div className='row-start-1 row-end-3 place-self-center' />
    </div>
  );
};

export default FoodItemInfo;
