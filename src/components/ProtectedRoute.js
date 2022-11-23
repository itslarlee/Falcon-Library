import {Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children}) => {

    const [userState] = useSelector((state) => [
        state.userSlice.userState,
      ]);

    const DEFAULT_URL = "/libros"
    if (userState && userState.role !== 'Admin') {
        return <Navigate to={DEFAULT_URL} replace /> 
    }
    return children;
}

export default ProtectedRoute