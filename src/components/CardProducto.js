import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../css/CardProducto.css';

const CardProducto = ({ product }) => {
  return (
    <>
    <Card className="producto-card">
      <Card.Img
        variant="top"
        src={product.imageOneUrl}
        alt={product.nombre}
      />
      <Card.Body className="card-info">
        <Card.Title>
          <h1 className="card-title">{product.nombre.toUpperCase()}</h1>
        </Card.Title>
        <Card.Text>
          <strong>Talles:</strong> {product.talles.join(', ')}<br />
          <strong>Precio:</strong> ${product.precio}
        </Card.Text>
        <Link to={{ pathname: `/DetalleProducto/${product._id}`, state: { product } }}>
          <button className="boton-detalles">
            Ver detalles
          </button>
        </Link>
      </Card.Body>
    </Card>
    </>
  );
};

export default CardProducto;