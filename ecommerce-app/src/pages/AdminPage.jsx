import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: ''
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setProducts(productService.getAll());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      productService.update(editingProduct.id, formData);
    } else {
      productService.create(formData);
    }
    resetForm();
    loadProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      productService.delete(id);
      loadProducts();
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', description: '', image: '', category: '' });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Admin Dashboard</h1>
        <div>
          <button onClick={() => navigate('/')} style={{ marginRight: '10px' }}>View Site</button>
          <button onClick={handleLogout} style={{ background: '#dc3545', color: 'white' }}>Logout</button>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              style={{ padding: '10px' }}
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              style={{ padding: '10px' }}
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{ padding: '10px' }}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              style={{ padding: '10px' }}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ gridColumn: '1/-1', padding: '10px', minHeight: '80px' }}
            />
          </div>
          <div style={{ marginTop: '15px' }}>
            <button type="submit" style={{ background: '#28a745', color: 'white', padding: '10px 20px', marginRight: '10px' }}>
              {editingProduct ? 'Update' : 'Add'} Product
            </button>
            {editingProduct && (
              <button type="button" onClick={resetForm} style={{ padding: '10px 20px' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products List */}
      <h2>Products ({products.length})</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h3>{product.name}</h3>
            <p><strong>${product.price}</strong></p>
            <p>{product.category && `Category: ${product.category}`}</p>
            <p>{product.description.substring(0, 100)}...</p>
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => handleEdit(product)} style={{ marginRight: '10px', background: '#ffc107' }}>Edit</button>
              <button onClick={() => handleDelete(product.id)} style={{ background: '#dc3545', color: 'white' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;