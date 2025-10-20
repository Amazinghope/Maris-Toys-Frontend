import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles}) => {
    const {user} = useSelector((state)=> state.reg)
    

    if(!user){
        return <Navigate to={'/Login'} replace/>
    }
    
    if( allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to={'unauthorized'} replace/>
    }
    return <Outlet/>
}
export default ProtectedRoute