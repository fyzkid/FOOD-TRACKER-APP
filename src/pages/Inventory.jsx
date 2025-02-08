import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCaretDown, FaEllipsisV } from 'react-icons/fa';

const Inventory = () => {
  // Dummy categories with items
  const initialCategories = {
    Fruits: [
      { id: 1, name: 'Apple', expiryDate: '2025-02-20' },
      { id: 2, name: 'Banana', expiryDate: '2025-02-25' },
    ],
    Vegetables: [
      { id: 3, name: 'Carrot', expiryDate: '2025-03-15' },
      { id: 4, name: 'Lettuce', expiryDate: '2025-03-20' },
    ],
    Medicine: [
      { id: 5, name: 'Panadol', expiryDate: '2025-03-21' },
      { id: 6, name: 'Paracetamol', expiryDate: '2025-06-09' },
    ],
    Bakery: [
      { id: 7, name: 'Bread', expiryDate: '2025-02-28' },
      { id: 8, name: 'Cake', expiryDate: '2025-03-05' },
    ],
    BeautyProducts: [
      { id: 9, name: 'Cream', expiryDate: '2025-07-28' },
      { id: 10, name: 'Soap', expiryDate: '2025-04-05' },
    ],
    Drinks: [
      { id: 11, name: 'Soda', expiryDate: '2025-04-10' },
      { id: 12, name: 'Juice', expiryDate: '2025-04-15' },
    ],
  };

  // State to manage categories & dropdown visibility
  const [categories, setCategories] = useState(initialCategories);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  // Toggle dropdown for categories
  const toggleDropdown = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  // Open "View Details" popup
  const openOptions = (item) => {
    setSelectedItem(item);
    setShowOptions(true);
  };

  // Delete an item
  const handleDelete = () => {
    setCategories((prevCategories) => {
      const updatedCategories = { ...prevCategories };
      for (const category in updatedCategories) {
        updatedCategories[category] = updatedCategories[category].filter(
          (item) => item.id !== selectedItem.id
        );
      }
      return updatedCategories;
    });
    setShowOptions(false);
  };

  // Open edit modal
  const openEditModal = () => {
    setEditedItem(selectedItem);
    setShowEditModal(true);
    setShowOptions(false);
  };

  // Save edited item
  const handleEditSave = () => {
    setCategories((prevCategories) => {
      const updatedCategories = { ...prevCategories };
      for (const category in updatedCategories) {
        updatedCategories[category] = updatedCategories[category].map((item) =>
          item.id === editedItem.id ? editedItem : item
        );
      }
      return updatedCategories;
    });
    setShowEditModal(false);
  };

  return (
    <div className='w-[90%] mx-auto'>
      {/* Heading */}
      <div className='flex justify-between items-center py-10'>
        <h1 className='text-xl font-bold'>Inventory</h1>
        <Link to='/dashboard/add-item'>
          <button className='bg-secondary py-2 px-3 rounded-md text-background'>Add Item</button>
        </Link>
      </div>

         {/* search bar and  total items count */}
         <div className='flex justify-between items-center'>
        <div>
          <input type="text" placeholder='Search Items....' className='py-2 px-6 rounded shadow '/>
        </div>
        <div>
          <button className='bg-white py-2 px-3 rounded text-text'>Total Items <br /> 242</button>
        </div>
      </div>

      {/* Categories Section */}
      <main className='bg-white rounded py-3 px-3 shadow md:w-[60%] my-4'>
        <h1 className='text-center font-semibold'>Select Categories</h1>

        <div className='py-4 my-3 flex flex-col gap-3'>
          {Object.keys(categories).map((category) => (
            <div key={category}>
              {/* Category Header */}
              <div
                className='flex justify-between items-center px-4 py-2 border-2 rounded-md border-text cursor-pointer'
                onClick={() => toggleDropdown(category)}
              >
                <h1>{category} <span>({categories[category].length} items)</span></h1>
                <span className={`text-xl transform transition-transform ${expandedCategory === category ? 'rotate-180' : ''}`}>
                  <FaCaretDown />
                </span>
              </div>

              {/* Dropdown Content */}
              {expandedCategory === category && (
                <div className='mt-2 bg-gray-100 p-3 rounded-md'>
                  {categories[category].map((item) => (
                    <div key={item.id} className='flex justify-between items-center border-b py-2'>
                      <div>
                        <p className='font-semibold'>{item.name}</p>
                        <p className='text-sm text-gray-500'>Expiry: {item.expiryDate}</p>
                      </div>
                      <button onClick={() => openOptions(item)} className='text-gray-700 cursor-pointer'>
                        <FaEllipsisV className='cursor-pointer' />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Options Popup */}
      {showOptions && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-5 rounded shadow-lg'>
            <h2 className='text-lg font-bold mb-3'>Item Options</h2>
            <p>What would you like to do?</p>
            <div className='flex justify-between mt-4'>
              <button onClick={openEditModal} className='bg-blue-500 text-white px-3 py-2 rounded'>Edit</button>
              <button onClick={handleDelete} className='bg-red-500 text-white px-3 py-2 rounded'>Delete</button>
            </div>
            <button onClick={() => setShowOptions(false)} className='mt-3 text-gray-500'>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-5 rounded shadow-lg'>
            <h2 className='text-lg font-bold mb-3'>Edit Item</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleEditSave();
            }}>
              <label className='block text-sm'>Item Name</label>
              <input
                type='text'
                value={editedItem.name}
                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                className='border p-2 rounded w-full mb-3'
              />

              <select name="Category" id="" className='border p-2 rounded w-full mb-3'>
                <option value="">Category</option>
                <option value="">Fruits</option>
                <option value="">Vegetables</option>
                <option value="">Medicine</option>
                <option value="">Bakery</option>
                <option value="">Beauty Products</option>
                <option value="">Drinks</option>
              </select>

              <label className='block text-sm'>Expiry Date</label>
              <input
                type='date'
                value={editedItem.expiryDate}
                onChange={(e) => setEditedItem({ ...editedItem, expiryDate: e.target.value })}
                className='border p-2 rounded w-full mb-3'
              />

              <div className='flex justify-end gap-3'>
                <button type='button' onClick={() => setShowEditModal(false)} className='bg-gray-300 px-3 py-2 rounded'>Cancel</button>
                <button type='submit' className='bg-blue-500 text-white px-3 py-2 rounded'>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
