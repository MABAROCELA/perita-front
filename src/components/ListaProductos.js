import React, { useState, useEffect } from 'react';
import CardProducto from './CardProducto';
import axios from 'axios';
import '../css/ListaProductos.css';


const ListaProductos = () => {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const URL_BACK = process.env.REACT_APP_BACK_URL;

        axios.get(`${URL_BACK}/products`)
            .then(response => {
                if (response.data && Array.isArray(response.data.products)) {
                    setProducts(response.data.products);
                    setLoading(false);
                } else {
                    setError('La respuesta no contiene una propiedad "products" válida');
                    setLoading(false);
                }
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="productos-container">
            {products.map((product) => (
                <CardProducto key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ListaProductos;
