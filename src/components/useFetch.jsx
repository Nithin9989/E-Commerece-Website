import { useEffect, useState } from "react"
import Products from "./Products/Products";
import axios from 'axios';

function useFetch() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products')
                setProducts(response.data.products);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
                setError('Failed To Load products');
                setLoading(false);
            }
        }
        getProducts();
    }, []);
    const addproducts = async () => {
        try {
            const response =
                await axios.post('https://dummyjson.com/products/add',
                    {
                        title: 'Iphone',
                        price: '69,890',
                        img: ''
                    });
            setProducts(prevproducts=> [...prevproducts, response.data])
        }
        catch (err) {
            console.log(err)
            setError('Failed To Load products');
            setLoading(false);
        }
        
    }
    const updateproducts = async(id) =>{
        try{
            const response = await axios.put(`https://dummyjson.com/products/${id}`,{
            price : '1,20,000'
        })
        setProducts((prevproducts)=>prevproducts.map((item)=>
        item.id === id ? response.data : item
    ))
        }
        catch(err){
            console.log(err);
            setError('Failed To Load products');
            setLoading(false);
        }
    }
    const deleteProduct = async(id) =>{
        const confirmDelete = window.confirm('Are You Sure To Del This Item')

        if(confirmDelete){
            const filteredProducts = products.filter((item)=>(
            item.id !== id
        ))
        setProducts(filteredProducts);
        }
    }
    return { products, addproducts, updateproducts, deleteProduct , error}
}
export default useFetch