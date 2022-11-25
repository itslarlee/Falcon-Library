import {Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserRoute = ({children}) => {

    const user = JSON.parse(window.sessionStorage.getItem('user'));
    console.log(user);
    const DEFAULT_URL = "/login"

    return user ? children : <Navigate to={DEFAULT_URL} replace /> 

}

export default UserRoute