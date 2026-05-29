
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
   const islogin = localStorage.getItem("isLogin");

   if(islogin !== "true"){
    return <Navigate to='/login'/>
   }
   return children;
}
export default ProtectedRoute;