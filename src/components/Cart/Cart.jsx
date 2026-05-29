import { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

function Cart() {
    const {
        totalPrice,
        cartItems,
        setCartItems } = useContext(ProductContext);

        const increaseQunatity = (id) =>{
            const updatedCart = cartItems.map((eachItem)=>{
                if(eachItem.id === id){
                    return{
                        ...eachItem, quantity: eachItem.quantity + 1
                    }
                }
                return eachItem
            });
            setCartItems(updatedCart)
        }

        const decreaseQunatity = (id) =>{
            const updatedCart = cartItems.map((eachItem)=>{
                if(eachItem.id === id){
                    return{
                        ...eachItem, 
                        quantity: eachItem.quantity > 1 ? eachItem.quantity - 1 : 1
                    }
                }
                return eachItem
            });
            setCartItems(updatedCart)
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
                    <div className="cart-card" key={eachItem.id}>
                        <img src={eachItem.thumbnail} alt='not-found'
                        className=""/>
                        <h2>{eachItem.title}</h2>
                        <p>{eachItem.price}</p>
                        <div className="quantity-section">
                            <button onClick={()=>decreaseQunatity(eachItem.id)}>-</button>
                            <span>{eachItem.quantity}</span>
                            <button onClick={()=>increaseQunatity(eachItem.id)}>+</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
export default Cart