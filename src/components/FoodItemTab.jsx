import { useMemo, useState, useEffect } from 'react';
import { FaTrash,FaPenToSquare } from 'react-icons/fa6';
import { IoMdMore } from 'react-icons/io';

import { daysBetween } from '../utils';

const FoodItemTab = ({ foodItem }) => {
  const { itemName, id, expiryDate } = foodItem;
  const currentUser = sessionStorage.getItem('currentUser');
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
        fullName: foodItem.itemName || "",
        category: foodItem.category || "",
        expiryDate: foodItem.expiryDate ? foodItem.expiryDate.split("T")[0] : "",
        notes: foodItem.notes || "",
    userId: currentUser,
  });
 
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const expiry_date = new Date(expiryDate);
  const todayDate = useMemo(() => new Date(), []);
  const isExpired = useMemo(() => todayDate > expiry_date, [todayDate, expiry_date]);
  const daysToExpiry = useMemo(() => daysBetween(expiry_date, todayDate), [todayDate, expiry_date]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://freshtrackapi.onrender.com/api/edit-item/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName,
            category: formData.category,
            expiryDate: formData.expiryDate,
            notes: formData.notes,
            userId: currentUser,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Item updated successfully!");
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error)
    }
  };
  const text = useMemo(() => {
    if (isExpired) {
      return `Expired ${daysToExpiry} ${daysToExpiry === 1 ? 'day' : 'days'} ago`;
    } else if (daysToExpiry >= 1) {
      return `Fresh for ${daysToExpiry} ${daysToExpiry === 1 ? 'day' : 'days'}`;
    } else {
      return "Expired today";
    }
  }, [isExpired, daysToExpiry]);

  return (
    <>
    <div
      className={`p-2.5 h-20 bg-white rounded-md grid grid-flow-col grid-cols-[20px_1fr_20px] grid-rows-2 border-[10px] ${
        isExpired ? 'border-red-100' : 'border-green-100'
      }`}>
        
      <div className='row-start-1 row-end-3 place-self-center' />
      <p className='font-semibold'>{itemName}</p>
      <p className={`text-sm ${isExpired ? 'text-red-500' : 'text-green-500'}`}>{text}</p>
      <div className='row-start-1 row-end-3'>
        {isExpired ? (
          <button>
          <FaTrash className='w-full h-full place-self-center cursor-pointer text-red-400' />
          </button>
        ) : (
          <button onClick={() => setIsEditing((prev) => !prev)}>
          <FaPenToSquare className='w-full h-full place-self-center cursor-pointer text-green-400' /></button>

        )}
      </div>
    </div>
    {isEditing &&
        <div className='flex flex-col justify-center items-center py-4'>
      <div className='flex flex-col gap-3 rounded-md p-8 shadow-lg w-[300px] bg-white'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='fullName'>Item Name</label>
        <input
          id='fullName'
          name='fullName'
          type='text'
          value={formData.fullName} onChange={handleChange}
          placeholder='Enter item name'
          className='border p-2 rounded-md w-full'
        />

        <label htmlFor='category'>Category</label>
        <input
          id='category'
          name='category'
          type='text'
          value={formData.category} onChange={handleChange}
          placeholder='Enter category'
          className='border p-2 rounded-md w-full'
        />

        <label htmlFor='expiryDate'>Expiry Date</label>
        <input
          id='expiryDate'
          name='expiryDate'
          type='date'
          value={formData.expiryDate} onChange={handleChange}
          className='border p-2 rounded-md w-full'
        />

        <label htmlFor='notes'>Notes (Optional)</label>
        <input
          id='notes'
          name='notes'
          type='text'
          value={formData.notes} onChange={handleChange}
          placeholder='Additional notes'
          className='border p-2 rounded-md w-full'
        />
        <button
          type='submit'
          className={`h-10 w-full text-white text-sm rounded-md mt-3 bg-green-500
          `}>
          Update Item
        </button>
        </form>
      </div>
    </div>
        }
    </>
  );
};

export default FoodItemTab;
