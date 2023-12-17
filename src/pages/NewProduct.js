import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/NewProduct.css';


const NewProduct = () => {

    const [productData, setProductData] = useState({
        nombre: '',
        precio: 0,
        descripcion: '',
        composicion: '',
        talles: [],
        imageOneUrl: '',
        imageTwoUrl: '',
        imageThreeUrl: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setProductData((prevData) => {
            const updatedTalles = checked
                ? [...prevData.talles, name]
                : prevData.talles.filter((talle) => talle !== name);

            return { ...prevData, talles: updatedTalles };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const URL_BACK = process.env.REACT_APP_BACK_URL;

        try {
            const enviarData = await axios.post(`${URL_BACK}/products/newProduct`, productData);

            if (enviarData.status === 201) {
                console.log('Producto creado exitosamente');
                navigate('/products')
            } else {
                console.error('Error al crear el producto');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <>
            <form className="newProductForm" onSubmit={handleSubmit}>
                <h4 className='titulo'>FORMULARIO DE CARGA DE PRODUCTO</h4>
                <div className="newProductFormBody">

                    <label>Nombre:
                        <input
                            className='inputNP'
                            type="text"
                            name="nombre"
                            value={productData.nombre}
                            onChange={handleInputChange}
                            required />
                    </label>

                    <label>Precio:
                        <input type="number"
                            className='inputNP'
                            name="precio"
                            value={productData.precio}
                            onChange={handleInputChange}
                            required />
                    </label>

                    <label>Descripción:
                        <textarea name="descripcion"
                            className='inputNP'
                            value={productData.descripcion}
                            onChange={handleInputChange}
                            required />
                    </label>

                    <label>Composición:
                        <input
                            type="text"
                            className='inputNP'
                            name="composicion"
                            value={productData.composicion}
                            onChange={handleInputChange}
                            required />
                    </label>


                    <label>Talles:
                        <div className='talles'>
                            <label>
                                <input
                                    type="checkbox"
                                    name="RN"
                                    checked={productData.talles.includes('RN')}
                                    onChange={handleCheckboxChange}
                                />
                                RN
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="3M"
                                    checked={productData.talles.includes('3M')}
                                    onChange={handleCheckboxChange}
                                />
                                3M
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="6M"
                                    checked={productData.talles.includes('6M')}
                                    onChange={handleCheckboxChange}
                                />
                                6M
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="12M"
                                    checked={productData.talles.includes('12M')}
                                    onChange={handleCheckboxChange}
                                />
                                12M
                            </label>
                        </div>
                    </label>


                    <label>Imagen 1 URL:
                        <input type="url"
                            className='inputNP'
                            name="imageOneUrl"
                            value={productData.imageOneUrl}
                            onChange={handleInputChange}
                            required />
                    </label>

                    <label>Imagen 2 URL:
                        <input
                            className='inputNP'
                            type="url"
                            name="imageTwoUrl"
                            value={productData.imageTwoUrl}
                            onChange={handleInputChange}
                            required />
                    </label>

                    <label>Imagen 3 URL:
                        <input
                            type="url"
                            className='inputNP'
                            name="imageThreeUrl"
                            value={productData.imageThreeUrl}
                            onChange={handleInputChange}
                            required />
                    </label>
                </div >
                <div className='buttonArea'>
                    <button
                        type="submit"
                        className='newProductButton'>
                        CARGAR PRODUCTO
                    </button>
                </div>
            </form >
        </>
    );
};

export default NewProduct;