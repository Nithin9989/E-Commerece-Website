import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

function Cart() {
    const { totalPrice, cartItems, setCartItems } = useContext(ProductContext);

    const increaseQunatity = (id) => {
        const updatedCart = cartItems.map((eachItem) => {
            eachItem.id === id
            if (eachItem.id === id) {
                return {
                    ...eachItem, quantity: eachItem.quantity + 1
                }
            }
            return eachItem
        })
        setCartItems(updatedCart)

    }
    const decreaseQunatity = (id) => {
        const updatedCart = cartItems.map((eachItem) => {
            eachItem.id === id
            if (eachItem.id === id) {
                return {
                    ...eachItem, quantity: eachItem.quantity > 1 ? eachItem.quantity - 1 : 1
                }
            }
            return eachItem
        })
        setCartItems(updatedCart)

    }
    const removeItem = (id) => {
        const confirm = window.confirm('Are You Sure');
        if (confirm) {
            const filteredData = cartItems.filter((eachItem) => (
                eachItem.id !== id
            ));
            setCartItems(filteredData);
        }
    }
    return (
        <div className="cart-page">
            <h1>My Cart</h1>
            {cartItems.length === 0
                ?
                <div className="empty-cart">
                    <h2>Your Cart is Empty</h2>
                    <p>Add Items To Cart</p>
                </div>
                :
                cartItems.map((eachItem) => (
                    <div className="cart-card">
                        <img src={eachItem.thumbnail} alt={eachItem.title} />
                        <div className="cart-content">
                            <h2>{eachItem.title}</h2>
                            <p>{eachItem.price}</p>

                            <div className="quantity-section">
                                <button onClick={() => decreaseQunatity(eachItem.id)}>-</button>
                                <span>{eachItem.quantity}</span>
                                <button onClick={() => increaseQunatity(eachItem.id)}>+</button>
                            </div>
                            <button className="delete-btn"
                                onClick={() => removeItem(eachItem.id)}>Remove</button>
                        </div>
                    </div>
                ))
            }
            <h2>Total Price : {totalPrice}</h2>
        </div>
    )
}
export default Cart