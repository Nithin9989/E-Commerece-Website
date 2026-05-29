import { useEffect, useState } from "react"
import Products from "./Products/Products";
import axios from 'axios';

function useFetch() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products')
                setProducts(response.data.products);
            }
            catch (err) {
                console.log(err);
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
            console.log(err)
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
    return { products, addproducts, updateproducts, deleteProduct }
}
export default useFetch