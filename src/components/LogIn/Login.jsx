import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";

function Login() {
    const navigate = useNavigate();
    const {islogin, setsLogin} = useContext(ProductContext)

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        
        e.preventDefault();

        if(mail && password){
            setsLogin(true);
            localStorage.setItem("isLogin","true");
            navigate('/');
        }
    }
    return (
        <>
        <h1 style={{textAlign:"center" , marginTop:"50px"}}>Login</h1>
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>User Email:</label>
                <input type="email"
                    value={mail}
                    placeholder="Enter Your Mail"
                    onChange={(e) => setMail(e.target.value)} />
                <label>UserPassword:</label>
                <input type="password"
                    value={password}
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
        </>
    )
}
export default Login