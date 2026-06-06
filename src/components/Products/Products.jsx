import { Link } from 'react-router-dom';
import { useState} from 'react';

import useFetch from '../useFetch';

function Products() {
    const [search, Setsearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const {products, addproducts, updateproducts,deleteProduct, error} = useFetch();

    const filteredDetails = products.filter((eachItem)=>(
        eachItem.title.toLowerCase().includes(search.toLowerCase())
    ));

    const itemsPerPage = 8;

    const lastIndex = currentPage * itemsPerPage
    console.log(lastIndex);
    
    const fristIndex = lastIndex - itemsPerPage;
    console.log(fristIndex);

    const currentDetails = filteredDetails.slice(fristIndex, lastIndex);

    const totalPages = Math.ceil(filteredDetails.length/itemsPerPage );

    return (
        <>
        {error && 
        <p className='error'>Failed To Load Products...</p>
        }
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
                currentDetails.map((eachItem) => (
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
            <div className='pagination'>
                <button 
                disabled = {currentPage === 1}
                onClick={()=>setCurrentPage(currentPage -1)}>⬅️ Previous</button>
                <span>Page {currentPage}</span>
                <button
                disabled = {currentPage === totalPages}
                onClick={()=>setCurrentPage(currentPage + 1)}>Next ➡️</button>
            </div>
        </>
    )
}
export default Products