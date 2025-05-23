import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
    if(localStorage.getItem("access_token") == null) {
        return <Navigate to={"/login"} />
    } else {
      return props.children
    }
}
