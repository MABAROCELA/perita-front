import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/DetalleProducto.css';

const DetalleProducto = () => {

  const { id } = useParams();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [selectedTalle, setSelectedTalle] = useState(null);
  const [comprarDisabled, setComprarDisabled] = useState(true);
  const [mainProductImage, setMainProductImage] = useState(null);

  useEffect(() => {

    const URL_BACK = process.env.REACT_APP_BACK_URL;

    axios.get(`${URL_BACK}/products`)
      .then(response => {
        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.log('La respuesta no contiene una propiedad "products" válida');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const foundProduct = Array.isArray(products)
      ? products.find(p => p._id.toString() === id)
      : null;
    setProduct(foundProduct);
  }, [products, id]);

  useEffect(() => {
    if (product) {
      setMainProductImage(product.imageOneUrl);
    }
  }, [product]);

  const handleComprarClick = () => {
    alert(`Agregaste a tu carrito ${product.nombre} - Talle: ${selectedTalle}`);
  };

  const handleTalleSelect = talle => {
    setSelectedTalle(talle);
    setComprarDisabled(false);
  };

  const handleThumbnailClick = foto => {
    setMainProductImage(foto);
  };

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <>
      <div className="detalle-producto">
        <div className="detalle-images">
          <div className="thumbnail_images">
            <ul id="thumbnail">
              <li key="main">
                <img
                  onClick={() => handleThumbnailClick(product.imageOneUrl)}
                  src={product.imageOneUrl}
                  id="main_product_image"
                  className='img-responsive'
                  alt={`${product.nombre} - Foto 1`}
                />
              </li>
              <li>
                <img
                  onClick={() => handleThumbnailClick(product.imageTwoUrl)}
                  src={product.imageTwoUrl}
                  id="second_product_image"
                  className='img-responsive'
                  alt={`${product.nombre} - Foto 2`}
                />
              </li>
              <li>
                <img
                  onClick={() => handleThumbnailClick(product.imageThreeUrl)}
                  src={product.imageThreeUrl}
                  id="third_product_image"
                  className='img-responsive'
                  alt={`${product.nombre} - Foto 3`}
                />
              </li>
            </ul>
          </div>

          <div className="main_image">
            <img
              src={mainProductImage}
              id="main_product_image"
              alt={`${product.nombre} - Foto Principal`}
            />
          </div>
        </div>
        <div className="detalle-info">
          <h2 className="detalle-nombre">{product.nombre.toUpperCase()}</h2>
          <p className="detalle-precio">${product.precio}</p>
          <p className="detalle-descripcion">{product.descripcion}</p>
          <p className="detalle-composicion">
            <strong>Composición:</strong> {product.composicion}
          </p>
          <div className="detalle-talles">
            <strong>Talles:</strong>
            <div className="talle-buttons">
              {product.talles.map((talle, index) => (
                <button
                  key={index}
                  className={`talle-button ${selectedTalle === talle ? 'selected' : ''}`}
                  onClick={() => handleTalleSelect(talle)}
                >
                  {talle}
                </button>
              ))}
            </div>
          </div>
          <button className="boton-comprar" onClick={handleComprarClick} disabled={comprarDisabled}>
            COMPRAR
          </button>
        </div>
      </div>
    </>
  );
};

export default DetalleProducto;
