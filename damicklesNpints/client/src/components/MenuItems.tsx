import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_MENU_ITEM, UPDATE_MENU_ITEM, DELETE_MENU_ITEM } from '../utils/mutation';
import { GET_USER_MENU } from '../utils/queries';
import { MenuItem } from '../models/Menu';


const MenuItems: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  const { loading, data, refetch } = useQuery(GET_USER_MENU);
  const [addMenuItem] = useMutation(ADD_MENU_ITEM);
  const [updateMenuItem] = useMutation(UPDATE_MENU_ITEM);
  const [deleteMenuItem] = useMutation(DELETE_MENU_ITEM);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      ...item,
      price: item.price.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMenuItem({ variables: { id } });
      refetch();
      alert('Item deleted successfully');
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateMenuItem({
          variables: {
            id: editingItem.menuId,
            input: formData
          }
        });
      } else {
        await addMenuItem({
          variables: {
            input: formData
          }
        });
      }
      setIsModalOpen(false);
      setFormData({ name: '', description: '', price: '', category: '' });
      setEditingItem(null);
      refetch();
      alert(editingItem ? 'Item updated successfully' : 'Item added successfully');
    } catch (err) {
      alert('Error saving item');
    }
  };

  return (
    <div className="menu-container">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="add-button"
      >
        Add Menu Item
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="menu-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.getUserMenu.map((item: MenuItem) => (
              <tr key={item.menuId}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>${Number(item.price).toFixed(2)}</td>
                <td>{item.category}</td>
                <td>
                  <button onClick={() => handleEdit(item)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(item.menuId)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="modal-buttons">
                <button type="submit">Save</button>
                <button 
                  type="button" 
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ name: '', description: '', price: '', category: '' });
                    setEditingItem(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItems;