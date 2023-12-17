import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';


import NaviBar from './components/Navibar';
import Footer from './components/Footer';

import NewUser from './pages/NewUser';
import Home from './pages/Home';
import Error from './pages/Error';
import UserList from './pages/UserList';
import NewProduct from './pages/NewProduct';
import ProductList from './pages/ProductList';
import Bienvenida from './pages/Bienvenida';
import Login from './pages/Login';
import ListaProductos from './components/ListaProductos';
import DetalleProducto from './pages/DetalleProducto';

import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const { isAuthenticated, user } = useAuth();

  const renderApp = () => {
    if (isAuthenticated) {

      if (user.role === 'admin') {
        return (
          <>
            <NaviBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/newUser" element={<NewUser />} />
              <Route path="/users/login" element={<Login />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/newProduct" element={<NewProduct />} />
              <Route path="/bienvenida" element={<Bienvenida />} />
              <Route path="/listaProductos" element={<ListaProductos />} />
              <Route path="/detalleProducto/:id" element={<DetalleProducto />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </>
        );
      } else if (user.role === 'client') {
        return (
          <>
            <NaviBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users/newUser" element={<NewUser />} />
              <Route path="/users/login" element={<Login />} />
              <Route path="/bienvenida" element={<Bienvenida />} />
              <Route path="/listaProductos" element={<ListaProductos />} />
              <Route path="/detalleProducto/:id" element={<DetalleProducto />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
          </>
        );
      }
    } else {

      return (
        <>
          <NaviBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/newUser" element={<NewUser />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </>
      );
    }
  };

  return (
    <div>
      {renderApp()}
    </div>
  );
}


export default App;
