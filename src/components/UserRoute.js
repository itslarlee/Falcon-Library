import {Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserRoute = ({children}) => {

    const user = JSON.parse(window.sessionStorage.getItem('user'));

    const DEFAULT_URL = "/login"
    if (user == null) {
        return <Navigate to={DEFAULT_URL} replace /> 
    }
    return children;
}

export default UserRoute