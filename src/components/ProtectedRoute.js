import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const user = JSON.parse(window.sessionStorage.getItem('user'));

    if (user?.role !== 'Admin') {
        return <Navigate to="/" replace /> 
    } else {
        return children;
    }
}

export default ProtectedRoute