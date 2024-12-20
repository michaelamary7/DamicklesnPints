import React, { useState } from 'react';

const MenuBuilder = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [template, setTemplate] = useState('');

  const addMenuItem = (item) => {
    setMenuItems([...menuItems, item]);
  };

  return (
    <div>
      <h2>Menu Builder</h2>
      <select onChange={(e) => setTemplate(e.target.value)}>
        <option value="">Select Template</option>
        <option value="template1">Template 1</option>
        <option value="template2">Template 2</option>
      </select>
      <button onClick={() => addMenuItem({ name: 'New Item', price: 10 })}>Add Item</button>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default MenuBuilder;