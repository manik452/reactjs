import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import { CartState } from "../../context/Contex"
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Modal } from "react-responsive-modal";

const Login = () => {
    /*const { setAuth } = useAuth();*/
    const { setAuth } = CartState();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    const [loginstate, setLoginstate] = useState({
        email: "",
        password: "",
        curPage: 0,
        habit: '',
        id: 0,
        open: true
    });
    const onOpenModal = () => {
        setLoginstate({ open: true });
    };

    const onCloseModal = () => {
        setLoginstate({ open: false });
    };
    /*
     *  habit: this.props.habitForm,
        id: this.props.id,
        open: true

    this.go_signUp = this.go_signUp.bind(this);
    this.updateTB_simple = this.updateTB_simple.bind(this);
    this.logIn = this.logIn.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);*/

    /*useEffect(() => {
        userRef.current.focus();
    }, [])*/

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);

        const accessToken = 'thisisaccesstoken';
        const roles = ['12', '12345'];
        setAuth({ user, pwd, roles, accessToken });

        /*try {
            *//* const response = await axios.post(LOGIN_URL,
     JSON.stringify({ user, pwd }),
     {
         headers: { 'Content-Type': 'application/json' },
         withCredentials: true
     }
 );
 console.log(JSON.stringify(response?.data));
 //console.log(JSON.stringify(response));
 const accessToken = response?.data?.accessToken;
  const roles = response?.data?.roles;
 *//*
         const accessToken = 'sdkfklsd'
   
         const roles = [122, 234];
         setAuth({ user, pwd, roles, accessToken });
         console.log("Handle Submit" + accessToken);
         setUser('');
         setPwd('');
         navigate(from, { replace: true });
     } catch (err) {
         if (!err?.response) {
             setErrMsg('No Server Response');
         } else if (err.response?.status === 400) {
             setErrMsg('Missing Username or Password');
         } else if (err.response?.status === 401) {
             setErrMsg('Unauthorized');
         } else {
             setErrMsg('Login Failed');
         }
         errRef.current.focus();
     }*/
    }

    return (
        <>
            {success ? (
                <section>
                    <h1> you are logged in!</h1>
                </section>
            ) : (


                <section>
                    <Modal
                        open={loginstate.open}
                        onClose={onCloseModal}
                        className="Modal">
                        <div className="loginform">
                            <h2>LOG IN</h2>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <form className="login-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <p>
                                        <label className="col-md-4 control-label" htmlFor="textinput">E-mail</label>
                                        &nbsp; &nbsp; &nbsp; &nbsp;
                                        <input
                                           
                                            type="text"
                                            name="email"
                                            placeholder="john.smith@email.com"
                                                value={user}
                                            onChange={(e) => setUser(e.target.value)}
                                            className="form-control input-md"
                                        ></input>
                                    </p>
                                </div>  {/* end of data*/}
                                <div className="form-group">
                                    <p>
                                        <label className="col-md-4 control-label" htmlFor="passwordinput">Password</label>
                                        &nbsp; &nbsp;
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Jcn-19iw10-sakq"
                                                value={pwd}
                                            onChange={(e) => setPwd(e.target.value)}
                                            className="form-control input-md">
                                        </input>
                                    </p>
                                </div> {/* end of data*/}
                                {/* create the password reset in Log in */}
                                {/*class ForgotPassword extends Component */}

                                <div className="create-account">
                                    {/*onClick={this.go_signUp}*/}
                                    <span >Don't have an account? Create account.</span>
                                </div>
                                <div className="form-group">
                                    <Link to="aaa">Forget password?</Link>
                                    <div className="col-md-5">
                                        {/*onClick={this.logIn}*/}
                                        <button id="login-btn" className="btn btn-info" >Log in</button>
                                    </div> {/* end of inner*/}
                                </div> {/* end of forgotpass*/}
                            </form>
                        </div> {/* end of loginform*/}

                    </Modal>
                    {/*<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p>*/}
                </section >
            )}
        </>


    )
}

export default Login