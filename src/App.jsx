import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';

import { ProductContext } from './components/Context/ProductContext';

import Login from './components/LogIn/Login';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';
import { useMemo, useState } from 'react';

function App() {
    const itemDetails = [
        { id: '1', name: 'samsungTV', price: '32,000', img: 'https://picsum.photos/320/219' },
        { id: '2', name: 'Juicer', price: '4,000', img: 'https://picsum.photos/190/219' },
        { id: '3', name: 'Mobiles', price: '22,000', img: 'https://picsum.photos/100/219' },
        { id: '4', name: 'Laptops', price: '55,000', img: 'https://picsum.photos/200/219' },
        { id: '5', name: 'Furniture', price: '1,24,000', img: 'https://picsum.photos/300/219' },
    ]
    const [islogin, setsLogin] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const existingProducts = cartItems.find((items) =>
            items.id === product.id
        );
        if (existingProducts) {
            const updatedCart = cartItems.map((eachItem) => {
                if (eachItem.id === product.id) {
                    return {
                        ...eachItem, quantity: eachItem.quantity + 1
                    }
                }
                return eachItem;
            });
            setCartItems(updatedCart);
        }
        else {
            setCartItems([...cartItems, { ...product, quantity: 1 }])
        }
    }
    const totalPrice = useMemo(()=>{
        return cartItems.reduce((accumulator, eachItem)=>{
            return accumulator + eachItem.price * eachItem.quantity
        },0)
    },[cartItems]);
    return (
        <>
            <ProductContext.Provider
                value=
                {{
                    itemDetails,
                    islogin,
                    setsLogin,
                    addToCart,
                    totalPrice,
                    cartItems,
                    setCartItems
                }}>
                <Header />
                <Routes>
                    <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/products' element={<ProtectedRoute><Products /></ProtectedRoute>} />
                    <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path='/products/:id' element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
                </Routes>
            </ProductContext.Provider>
        </>
    )
}
export default App