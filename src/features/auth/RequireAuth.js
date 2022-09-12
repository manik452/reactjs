import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentAccessToken, selectCurrentRoles } from "./authSlice"
import store from "../../app/store"


const RequireAuth = ({ allowedRoles }) => {
    /*const roles = useSelector((state) => state.roles);*/
    const location = useLocation();
    const storeData = store.getState();
    /*const accessToken = useSelector(selectCurrentAccessToken)
    const roles = useSelector(selectCurrentRoles)*/
    console.log("Sotre require AUth" + storeData);
    const accessToken = storeData.login.accessToken;
    const roles = storeData.login.roles;
    const authStore = storeData.login;
    console.log("token Is:" + storeData.login.accessToken);
    console.log("roles Is:" + storeData.login.roles);
    console.log(accessToken);
    return (
        Array.isArray(authStore.roles) ? authStore.roles.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : authStore.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
        /*roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : accessToken !=="" //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />*/
       
       /*allowedRoles?.includes(roles)
        ? <Outlet />
            : roles //changed from user to accessToken to persist login after refresh
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />*/
    )
}
export default RequireAuth