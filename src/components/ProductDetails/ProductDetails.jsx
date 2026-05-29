import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { ProductContext } from "../Context/ProductContext";
import { useContext } from "react";


function ProductDetails(){

    const { products } = useFetch();
    const {addToCart} = useContext(ProductContext)

    const { id } = useParams();

    const singleData = products.find(
        (eachItem) => eachItem.id === Number(id)
    );

    return(
        <>
        {singleData ? (
            <div className="details-page">

                <div className="details-card">

                    <div className="details-image-section">
                        <img
                            src={singleData.thumbnail}
                            alt="not-found"
                            className="details-img"
                        />
                    </div>

                    <div className="details-content">

                        <h1>{singleData.title}</h1>

                        <p className="details-price">
                            ₹ {singleData.price}
                        </p>

                        <p className="details-description">
                            Premium quality product with modern design and
                            amazing user experience.
                        </p>

                        <button className="cart-btn"
                        onClick={()=>addToCart(singleData)}>
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>
        ) : (
            <h1>No Product Found</h1>
        )}
        </>
    )
}

export default ProductDetails