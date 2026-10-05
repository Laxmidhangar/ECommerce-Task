import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({ name: '', price: '', imageUrl: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.price || !formData.imageUrl) {
      setError('All fields are required.');
      return;
    }

    if (Number(formData.price) <= 0) {
      setError('Price must be greater than zero.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/products', {
        name: formData.name,
        price: Number(formData.price),
        imageUrl: formData.imageUrl
      });

      setFormData({ name: '', price: '', imageUrl: '' });
      if (onProductAdded) onProductAdded(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product.');
    }
  };

  return (
    <div className="card">
      <h3>Add New Product</h3>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} />
        </div>
        <button type="submit" className="btn">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;