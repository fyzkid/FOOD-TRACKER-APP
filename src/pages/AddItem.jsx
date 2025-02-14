import { useState, useEffect } from 'react';

const AddItem = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [userId, setUserId] = useState('');

  // Predefined categories for the dropdown
  const categories = [
    'Fruits',
    'Medicine',
    'Vegetables',
    'Bakery',
    'Beauty Products',
    'Drink',
  ];

  useEffect(() => {
    const currentUser = sessionStorage.getItem('currentUser');
    setUserId(currentUser);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !category || !expiryDate) {
      alert('Please fill in all required fields');
      return;
    }
  
    const itemData = { name, category, expiryDate, notes, userId };
  
    try {
      const response = await fetch('https://freshtrackapi.onrender.com/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add item');
      }
  
      alert('Item added successfully!');
      
      // Dispatch event to refresh inventory
      window.dispatchEvent(new Event("refreshInventory"));
  
      // Reset form fields
      setName('');
      setCategory('');
      setExpiryDate('');
      setNotes('');
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center py-20'>
      <div className='flex flex-col gap-3 rounded-md p-8 shadow-lg w-[500px] bg-white'>
        <h2 className='text-lg font-bold text-center'>Add Item</h2>

        {/* Item Name Input */}
        <label htmlFor='name'>Item Name</label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter item name'
          className='border p-2 rounded-md w-full'
        />

        {/* Category Dropdown */}
        <label htmlFor='category'>Category</label>
        <select
          id='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='border p-2 rounded-md w-full bg-white'>
          <option value='' disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Expiry Date Input */}
        <label htmlFor='expiryDate'>Expiry Date</label>
        <input
          id='expiryDate'
          type='date'
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className='border p-2 rounded-md w-full'
        />

        {/* Notes Input */}
        <label htmlFor='notes'>Notes (Optional)</label>
        <input
          id='notes'
          type='text'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder='Additional notes'
          className='border p-2 rounded-md w-full'
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!userId}
          className={`h-10 w-full text-white text-sm rounded-md mt-3 ${
            userId ? 'bg-green-500' : 'bg-gray-400 cursor-not-allowed'
          }`}>
          {userId ? 'Add Item' : 'Loading...'}
        </button>
      </div>
    </div>
  );
};

export default AddItem;
