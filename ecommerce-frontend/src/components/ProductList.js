import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products', {
                auth: {
                    username: 'admin',
                    password: 'admin123'
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${id}`, {
                auth: {
                    username: 'admin',
                    password: 'admin123'
                }
            });
            fetchProducts(); // Refresh the product list
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Product List</h2>
            <button
                className="btn btn-success mb-3"
                onClick={() => navigate('/products/add')}
            >
                Add Product
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => navigate(`/products/edit/${product.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;