import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import store from "../../app/store"

const Welcome = () => {
    const storeData = store.getState().auth;
    const welcome = storeData.user ? `Welcome ${storeData.user}!` : 'Welcome!'
    console.log("welcome Token is: " + storeData.accessToken);
    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {storeData.accessToken}</p>
            <p><Link to="/userList">Go to the Users List</Link></p>
        </section>
    )
    return content
}
export default Welcome