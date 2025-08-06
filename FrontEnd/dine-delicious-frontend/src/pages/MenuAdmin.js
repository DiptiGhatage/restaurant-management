import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

const MenuAdmin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
    category: 'MAIN_COURSE',
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const categories = ['STARTER', 'MAIN_COURSE', 'DESSERT', 'BEVERAGE', 'VEG', 'NON_VEG', 'COMBO'];

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await axios.get('/menu-items');
      setMenuItems(res.data);
    } catch {
      setError('Failed to fetch menu items');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.description.trim() || Number(form.price) <= 0) {
      setError('Please fill all fields correctly');
      return;
    }

    try {
      if (editId) {
        await axios.put(`/menu-items/${editId}`, form);
      } else {
        await axios.post('/menu-items', form);
      }

      setForm({ name: '', description: '', price: '', available: true, category: 'MAIN_COURSE' });
      setEditId(null);
      fetchMenu();
    } catch {
      setError('Failed to save menu item');
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      available: item.available,
      category: item.category,
    });
    setEditId(item.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;

    try {
      await axios.delete(`/menu-items/${id}`);
      fetchMenu();
    } catch {
      setError('Failed to delete menu item');
    }
  };

  const handleCancel = () => {
    setForm({ name: '', description: '', price: '', available: true, category: 'MAIN_COURSE' });
    setEditId(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">🍽️ Admin - Menu Management</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Form Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name"
            className="border border-gray-300 rounded px-3 py-2" />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description"
            className="border border-gray-300 rounded px-3 py-2" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number"
            className="border border-gray-300 rounded px-3 py-2" min="1" />
          <select name="category" value={form.category} onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2">
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
            ))}
          </select>
          <label className="flex items-center gap-2">
            <input name="available" type="checkbox" checked={form.available} onChange={handleChange} />
            Available
          </label>
        </div>

        <div className="mt-4 flex gap-3">
          <button onClick={handleSubmit} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded">
            {editId ? 'Update' : 'Add'} Menu Item
          </button>
          {editId && (
            <button onClick={handleCancel} className="text-gray-500 hover:text-red-500">Cancel</button>
          )}
        </div>
      </div>

      {/* Card View */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition">
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="font-semibold text-green-600 text-sm mb-1">₹{item.price}</p>
              <p className="text-xs text-gray-500 mb-1">Category: {item.category}</p>
              <p className={`text-xs font-medium ${item.available ? 'text-green-700' : 'text-red-500'}`}>
                {item.available ? 'Available' : 'Not Available'}
              </p>
            </div>
            <div className="flex justify-between px-4 pb-4">
              <button onClick={() => handleEdit(item)} className="text-blue-500 hover:underline text-sm">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {menuItems.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No menu items added yet.</p>
      )}
    </div>
  );
};

export default MenuAdmin;
