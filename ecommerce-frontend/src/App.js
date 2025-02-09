import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/add" element={<ProductForm />} />
                    <Route path="/products/edit/:id" element={<ProductForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;