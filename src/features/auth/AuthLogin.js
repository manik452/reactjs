import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import {gapi } from 'gapi-script'

const AuthLogin = () => {
    const clientId = "73951324179-434dta93iau5cpv2228lslnf9dlovrp6.apps.googleusercontent.com";
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showLogoutButton, setShowLogoutButton] = useState(false);
    const onLoginSuccess = (res) => {
        alert("you have been singed out onLoginSuccess");
        console.log('Login Success', res);
        setShowLoginButton(false);
        setShowLogoutButton(true);
    }
    const onFailureSuccess = (res) => {
        alert("you have been singed out onFailureSuccess");
        console.log('Login Failed', res);
    }
    const onSignoutSuccess = () => {
        alert("you have been singed out successfully");
        setShowLoginButton(true);
        setShowLogoutButton(false);
    }

    const userRef = useRef()
    const errRef = useRef()
    const [open, setOpen] = useState(true)
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()
    const onCloseModal = () => {
        setOpen(false);
    };

    const responseGoogle = (response) => {
        console.log(response);
    }

    useEffect(() => {
        /* userRef.current.focus()*/

        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId })
        });
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ user, pwd }).unwrap();

            dispatch(setCredentials({ ...userData, user }));
            setUser('');
            setPwd('');
            navigate('/welcome');
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value)

    const handlePwdInput = (e) => setPwd(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (

        <div className="nav-container">
            {/*<div className="homepage-btns">
                <button className="modal-btns" id="signup-modal-btn" onClick={this.go_signUp}>Sign Up</button>
                <button type="button" className="modal-btns" id="login-modal-btn" onClick={this.onOpenModal}>Log In</button>
            </div>
            <div className="hero-banner">
                <p>A thousand miles starts with the first step.</p>
                <p>(We can include a gif/slideshow of our app features here)</p>
            </div>*/}
            <Modal
                open={open}
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
                                    onChange={handleUserInput}
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
                                    onChange={handlePwdInput}
                                    value={pwd}
                                    className="form-control input-md">
                                </input>
                            </p>
                        </div> {/* end of data*/}
                        {/* create the password reset in Log in */}
                        {/*class ForgotPassword extends Component */}

                        <div className="create-account">

                            <span >Don't have an account? Create account.</span>
                        </div>
                        <div className="form-group">
                            <Link to="aaa">Forget password?</Link>
                            <div className="col-md-5">
                                <button id="login-btn" className="btn btn-info">Log in</button>
                            </div> {/* end of inner*/}
                        </div> {/* end of forgotpass*/}
                    </form>
                    {showLoginButton ?
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Login"
                            onSuccess={onLoginSuccess}
                            onFailure={onFailureSuccess}
                            cookiePolicy={'single_host_origin'}
                        />

                        : null
                    }
                    {showLogoutButton ?
                        <GoogleLogout
                            clientId={clientId}
                            buttonText="Logout"
                            onLogoutSuccess={onSignoutSuccess} />
                        : null
                    }

                </div> {/* end of loginform*/}

            </Modal>
        </div>

        /*
         * onClick={this.go_signUp}
         * <section className="login">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Employee Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>*/


    )

    return content
}
export default AuthLogin