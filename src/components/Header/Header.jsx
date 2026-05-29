import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext';

function Header(){
    const {islogin, setsLogin} = useContext(ProductContext);

    const navigate = useNavigate();

    const handleLogOut = () =>{
        setsLogin(false)
        localStorage.removeItem("isLogin");
        navigate('/login');
    }

    const handleLogin = () =>{
        setsLogin(true);
        navigate('/login');
    }
    
    return(
        <nav className="navbar">
            <h1 className="logo">ShopLikeNever</h1>
            <Link to='/' className='nav-links'>Home</Link>
            <Link to='/products' className='nav-links'>Products</Link>
            <Link to='/cart' className='nav-links'>Cart</Link>
            <Link to='/wishlist' className='nav-links'>WishList</Link>
            {islogin ?
            <button className='logout-btn' 
            onClick={handleLogOut}>Logout</button>
            :
            <button className='logout-btn' 
            onClick={handleLogin}>Login</button>
            }
        </nav>
    )
}
export default Header