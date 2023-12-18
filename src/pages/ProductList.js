import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ProductList.css'

const Products = () => {

    const [products, setProducts] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        _id: '',
        nombre: '',
        precio: '',
        descripcion: '',
        composicion: '',
        talles: [],
        imageOneUrl: '',
        imageTwoUrl: '',
        imageThreeUrl: ''
    });

    const URL_BACK = process.env.REACT_APP_BACK_URL;

    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${URL_BACK}/products`);
            setProducts(data.products);
            console.log("Lista de productos obtenida");
        } catch (error) {
            console.error("Error al obtener lista de productos:", error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleDelete = async (productId) => {

        const URL_BACK = process.env.REACT_APP_BACK_URL;

        try {
            const response = await axios.delete(`${URL_BACK}/products/delete/${productId}`);
            const { success, message } = response.data;

            if (success) {
                setProducts(products.filter((product) => product._id !== productId));
                console.log(`Producto eliminado con éxito. Mensaje: ${message}`);
            } else {
                console.error(`Error al eliminar producto. Mensaje: ${message}`);
            }
        } catch (error) {
            console.error("Error en la solicitud DELETE:", error);
        }
    };

    const handleEdit = (product) => {
        setEditMode(true);
        setEditedProduct({ ...product });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setEditedProduct((prevProduct) => {
            const updatedTalles = checked
                ? [...prevProduct.talles, name]
                : prevProduct.talles.filter((talle) => talle !== name);

            return { ...prevProduct, talles: updatedTalles };
        });
    };

    const handleUpdateProduct = async () => {

        const URL_BACK = process.env.REACT_APP_BACK_URL;

        try {
            const response = await axios.put(`${URL_BACK}/products/edit/${editedProduct._id}`, {
                nombre: editedProduct.nombre,
                precio: editedProduct.precio,
                descripcion: editedProduct.descripcion,
                composicion: editedProduct.composicion,
                talles: editedProduct.talles,
                imageOneUrl: editedProduct.imageOneUrl,
                imageTwoUrl: editedProduct.imageTwoUrl,
                imageThreeUrl: editedProduct.imageThreeUrl,
            });

            const { success, product, message } = response.data;

            if (success) {
                setEditMode(false);
                setProducts((prevProducts) =>
                    prevProducts.map((p) => (p._id === product._id ? product : p))
                );
                console.log("Producto actualizado exitosamente");
                alert("Producto actualizado con éxito");
            } else {
                console.error(message || "Error desconocido al actualizar producto");
            }
        } catch (error) {
            console.error("Error en la solicitud PUT:",
                error.message || "Error en la solicitud"
            );
        }
    };

    const handleExitEditMode = () => {
        setEditMode(false);
        setEditedProduct({
            _id: '',
            nombre: '',
            precio: '',
            descripcion: '',
            composicion: '',
            talles: [],
            imageOneUrl: '',
            imageTwoUrl: '',
            imageThreeUrl: ''
        });
    };

    const handleAddProduct = () => {
        navigate("/products/newProduct");
    };

    const handleImageInputChange = (e) => {
        const { name, value } = e.target;

        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    return (
        <>
        <div className="product-list">
            <h4 className="text-center">LISTA DE PRODUCTOS</h4>
            <div className="text-center container m-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#Id</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Composición</th>
                            <th>Talles</th>
                            <th>Img1</th>
                            <th>Img2</th>
                            <th>Img3</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>
                                    {editMode && editedProduct._id === product._id ? (
                                        <input
                                            type="text"
                                            value={editedProduct.nombre}
                                            onChange={(e) =>
                                                setEditedProduct({ ...editedProduct, nombre: e.target.value })
                                            }
                                        />
                                    ) : (
                                        product.nombre
                                    )}
                                </td>
                                <td>
                                    {editMode && editedProduct._id === product._id ? (
                                        <input
                                            type="number"
                                            value={editedProduct.precio}
                                            onChange={(e) =>
                                                setEditedProduct({ ...editedProduct, precio: e.target.value })
                                            }
                                        />
                                    ) : (
                                        product.precio
                                    )}
                                </td>
                                <td>
                                    {editMode && editedProduct._id === product._id ? (
                                        <input
                                            type="text"
                                            value={editedProduct.descripcion}
                                            onChange={(e) =>
                                                setEditedProduct({ ...editedProduct, descripcion: e.target.value })
                                            }
                                        />
                                    ) : (
                                        product.descripcion
                                    )}
                                </td>
                                <td>
                                    {editMode && editedProduct._id === product._id ? (
                                        <input
                                            type="text"
                                            value={editedProduct.composicion}
                                            onChange={(e) =>
                                                setEditedProduct({ ...editedProduct, composicion: e.target.value })
                                            }
                                        />
                                    ) : (
                                        product.composicion
                                    )}
                                </td>

                                <td>
                                    {editMode && editedProduct._id === product._id ? (
                                        <>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="RN"
                                                    checked={editedProduct.talles.includes('RN')}
                                                    onChange={handleCheckboxChange}
                                                />
                                                RN
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="3M"
                                                    checked={editedProduct.talles.includes('3M')}
                                                    onChange={handleCheckboxChange}
                                                />
                                                3M
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="6M"
                                                    checked={editedProduct.talles.includes('6M')}
                                                    onChange={handleCheckboxChange}
                                                />
                                                6M
                                            </label>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="12M"
                                                    checked={editedProduct.talles.includes('12M')}
                                                    onChange={handleCheckboxChange}
                                                />
                                                12M
                                            </label>
                                        </>
                                    ) : (
                                        product.talles.join(', ')
                                    )}
                                </td>

                                <td>
                                    {editMode && editedProduct._id === product._id ? (
                                        <input
                                            type="text"
                                            value={editedProduct.imageOneUrl}
                                            name="imageOneUrl"
                                            onChange={handleImageInputChange}
                                        />
                                    ) : (
                                        <img src={product.imageOneUrl} alt="imagen1" style={{ width: '100px', height: '100px' }} />
                                    )}
                                </td>
                                <td>
                                    {editMode && editedProduct._id === product._id ? (
                                        <input
                                            type="text"
                                            value={editedProduct.imageTwoUrl}
                                            name="imageTwoUrl"
                                            onChange={handleImageInputChange}
                                        />
                                    ) : (
                                        <img src={product.imageTwoUrl} alt="imagen2" style={{ width: '100px', height: '100px' }} />
                                    )}
                                </td>
                                <td>
                                    {editMode && editedProduct._id === product._id ? (
                                        <input
                                            type="text"
                                            value={editedProduct.imageThreeUrl}
                                            name="imageThreeUrl"
                                            onChange={handleImageInputChange}
                                        />
                                    ) : (
                                        <img src={product.imageThreeUrl} alt="imagen3" style={{ width: '100px', height: '100px' }} />
                                    )}
                                </td>
                                <td>
                                    {editMode && editedProduct._id === product._id ? (
                                        <>
                                            <button className="productButton"onClick={handleUpdateProduct}>CONFIRMAR</button>
                                            <button className="productButton"onClick={handleExitEditMode}>CANCELAR</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="productButton" onClick={() => handleEdit(product)}>EDITAR</button>
                                            <button className="productButton" onClick={() => handleDelete(product._id)}>ELIMINAR</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <button type="button" className="addProductButton" onClick={handleAddProduct}>AGREGAR PRODUCTO</button>
            </div>
            </div>
        </>
        
    );
};

export default Products;