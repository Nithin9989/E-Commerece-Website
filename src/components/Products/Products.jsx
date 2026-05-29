import { Link } from 'react-router-dom';
import { useContext , useState, useEffect} from 'react';

import { ProductContext } from '../Context/ProductContext';
import useFetch from '../useFetch';


function Products() {
    const {itemDetails} = useContext(ProductContext);
    const [search, Setsearch] = useState('');

    const {products, addproducts, updateproducts,deleteProduct} = useFetch();

    const filteredDetails = products.filter((eachItem)=>(
        eachItem.title.toLowerCase().includes(search.toLowerCase())
    ));

    return (
        <>
            <h1 style={{ textAlign: "center", margin: "20px" }}>Welcome To products Page</h1>
            <input type='text'
            value={search}
                placeholder='search results'
                className='search-input' 
                onChange={(e)=> Setsearch(e.target.value)}/>
                <button className='logout-btn'
                onClick={addproducts}>Add To Products</button>
            <div className="products-container">
                {filteredDetails.length === 0 ? <h2>No Products Here</h2> 
                : 
                filteredDetails.map((eachItem) => (
                    <div className="product-card" key={eachItem.id}>
                        <h2>{eachItem.title}</h2>
                        <p>{eachItem.price}</p>
                        <img src={eachItem.thumbnail} alt="not-found" />
                        <Link to={`/products/${eachItem.id}`}>
                            <button className='details-btn'>View Details</button>
                        </Link>
                        <button className='details-btn'
                        onClick={()=>updateproducts(eachItem.id)}>
                        update
                        </button>
                        <button className='delete-btn'
                        onClick={()=>deleteProduct(eachItem.id)}
                        >Delete</button>
                    </div>
                ))
                }
            </div>
        </>
    )
}
export default Products