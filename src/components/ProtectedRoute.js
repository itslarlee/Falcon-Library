import {Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children}) => {

    const user = JSON.parse(window.sessionStorage.getItem('user'));

    console.log(user);
    if (user.role !== 'Admin') {
        return <Navigate to="/" replace /> 
    }
    return children;
}

export default ProtectedRoute