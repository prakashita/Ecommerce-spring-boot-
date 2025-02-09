import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ product, onSave }) => {
    const [name, setName] = useState(product ? product.name : '');
    const [description, setDescription] = useState(product ? product.description : '');
    const [price, setPrice] = useState(product ? product.price : '');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, description, price };

        try {
            if (product) {
                // Update existing product
                await axios.put(`http://localhost:8080/api/products/${product.id}`, newProduct, {
                    auth: {
                        username: 'admin',
                        password: 'admin123'
                    }
                });
            } else {
                // Create new product
                await axios.post('http://localhost:8080/api/products', newProduct, {
                    auth: {
                        username: 'admin',
                        password: 'admin123'
                    }
                });
            }
            navigate('/products');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {product ? 'Update' : 'Add'} Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;