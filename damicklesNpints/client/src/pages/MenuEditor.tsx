import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

interface MenuTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  backgroundColor: string;
}

const MenuEditor: React.FC = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [theme, setTheme] = useState<MenuTheme>({
    primaryColor: '#333333',
    secondaryColor: '#ffffff',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial'
  });
  const [colorPickerState, setColorPickerState] = useState({
    show: false,
    type: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fonts = [
    'Arial',
    'Times New Roman',
    'Georgia',
    'Helvetica',
    'Verdana',
    'Roboto',
    'Open Sans'
  ];

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/menu', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch menu');
      
      const data = await response.json();
      setCategories(data.categories || []);
      setTheme(data.theme || theme);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const saveMenu = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/menu', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ categories, theme })
      });

      if (!response.ok) throw new Error('Failed to save menu');
      
      alert('Menu saved successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save menu');
    }
  };

  const addCategory = () => {
    const newCategory: MenuCategory = {
      id: crypto.randomUUID(),
      name: 'New Category',
      items: []
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (categoryId: string, newName: string) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, name: newName }
        : category
    ));
  };

  const deleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== categoryId));
    }
  };

  const addMenuItem = (categoryId: string) => {
    const newItem: MenuItem = {
      id: crypto.randomUUID(),
      name: 'New Item',
      description: 'Description',
      price: 0
    };

    setCategories(categories.map(category =>
      category.id === categoryId
        ? { ...category, items: [...category.items, newItem] }
        : category
    ));
  };

  const updateMenuItem = (categoryId: string, itemId: string, updates: Partial<MenuItem>) => {
    setCategories(categories.map(category =>
      category.id === categoryId
        ? {
            ...category,
            items: category.items.map(item =>
              item.id === itemId
                ? { ...item, ...updates }
                : item
            )
          }
        : category
    ));
  };

  const deleteMenuItem = (categoryId: string, itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setCategories(categories.map(category =>
        category.id === categoryId
          ? { ...category, items: category.items.filter(item => item.id !== itemId) }
          : category
      ));
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Theme Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Color Pickers */}
          <div className="space-y-4">
            {['primaryColor', 'secondaryColor', 'backgroundColor'].map((colorType) => (
              <div key={colorType} className="flex items-center space-x-4">
                <label className="block text-sm font-medium text-gray-700">
                  {colorType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <div
                  className="w-10 h-10 rounded-md cursor-pointer border shadow"
                  style={{ backgroundColor: theme[colorType as keyof MenuTheme] }}
                  onClick={() => setColorPickerState({ show: true, type: colorType })}
                />
              </div>
            ))}
            {colorPickerState.show && (
              <div className="absolute z-10">
                <div
                  className="fixed inset-0"
                  onClick={() => setColorPickerState({ show: false, type: '' })}
                />
                <ChromePicker
                  color={theme[colorPickerState.type as keyof MenuTheme]}
                  onChange={(color) => {
                    setTheme({
                      ...theme,
                      [colorPickerState.type]: color.hex
                    });
                  }}
                />
              </div>
            )}
          </div>

          {/* Font Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={theme.fontFamily}
              onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value })}
            >
              {fonts.map((font) => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu Categories</h2>
          <button
            onClick={addCategory}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Add Category
          </button>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => updateCategory(category.id, e.target.value)}
                  className="text-xl font-bold px-2 py-1 border rounded"
                />
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete Category
                </button>
              </div>

              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 border-b pb-4">
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateMenuItem(category.id, item.id, { name: e.target.value })}
                        className="font-medium w-full px-2 py-1 border rounded mb-2"
                        placeholder="Item name"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => updateMenuItem(category.id, item.id, { description: e.target.value })}
                        className="w-full px-2 py-1 border rounded mb-2"
                        placeholder="Description"
                        rows={2}
                      />
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateMenuItem(category.id, item.id, { price: parseFloat(e.target.value) })}
                        className="w-32 px-2 py-1 border rounded"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <button
                      onClick={() => deleteMenuItem(category.id, item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addMenuItem(category.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  + Add Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={saveMenu}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Save Menu
        </button>
      </div>
    </div>
  );
};

export default MenuEditor;
