import {Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserRoute = ({children}) => {

    const [userState] = useSelector((state) => [
        state.userSlice.userState,
      ]);

    const DEFAULT_URL = "/login"
    if (userState == null) {
        return <Navigate to={DEFAULT_URL} replace /> 
    }
    return children;
}

export default UserRoute