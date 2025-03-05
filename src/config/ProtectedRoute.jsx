import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import Loading from "../components/Loading";
import {ToastContainer} from "react-toastify";

const ProtectedRoute = () => {
    const {token} = useSelector((state) => state.auth);
    const {isLoading} = useSelector((state) => state.loading);
    if (isLoading) {
        return <Loading/>;
    }

    return token ? <>
        <ToastContainer position="top-right" autoClose={3000}/>
        <Outlet/>
    </> : <Navigate to="/" replace/>;
};

export default ProtectedRoute;