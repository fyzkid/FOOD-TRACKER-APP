

export const getInventory = async () => {
  const response = await fetch('https://fresh-track-api.onrender.com/api/items', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  // if (!response.ok) {
  //   throw new Error(`Failed to fetch inventory: ${response.statusText}`);
  // }

  const data = await response.json();
  return data;
};


export const deleteItem = async (itemId) => {
  const response = await fetch(`https://fresh-track-api.onrender.com/api/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete item: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};


export const editItem = async (itemId, itemData) => {
  const response = await fetch(`https://fresh-track-api.onrender.com/api/items/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    throw new Error(`Failed to edit item: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};