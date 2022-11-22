import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({user, children}) => {
    const DEFAULT_URL = "/libros"
    if (user.role !== 'Admin') {
        console.log(user);
        <Navigate to="/libros" replace /> //navugate not wirking
    }
    return children;
}

export default ProtectedRoute