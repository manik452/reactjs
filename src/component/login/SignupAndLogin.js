import React, { Component } from "react";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';

class SignupAndLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            curPage: 0,
            habit: this.props.habitForm,
            id: this.props.id,
            open: true
        };
        this.go_signUp = this.go_signUp.bind(this);
        this.updateTB_simple = this.updateTB_simple.bind(this);
        this.logIn = this.logIn.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    logIn(event) {
        console.log(
            "LOGIN! '" + this.state.email + "' - '" + this.state.password + "'"
        );
        //when user submits, it takes the state email and password and
        // sends to firebase auth and signin functions

        const { email, password } = this.state;
        this.props.logIn(event, email, password);
    }

    go_signUp() {
        this.props.signUpPage(true);
    }



    updateTB_simple(event) {
        const target = event.target;
        var value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        // console.log("UPDATETB:" + value);
    }

    getMessagesFromDatabase() { }

    // modal functions
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };


    render() {
        const { open } = this.state;
        return (
            <div className="nav-container">
                <div className="homepage-btns">
                    <button className="modal-btns" id="signup-modal-btn" onClick={this.go_signUp}>Sign Up</button>
                    <button type="button" className="modal-btns" id="login-modal-btn" onClick={this.onOpenModal}>Log In</button>
                </div>
                <div className="hero-banner">
                    <p>A thousand miles starts with the first step.</p>
                    <p>(We can include a gif/slideshow of our app features here)</p>
                </div>
                <Modal
                    open={open}
                    onClose={this.onCloseModal}
                    className="Modal">
                    <div className="loginform">
                        <h2>LOG IN</h2>
                        <form className="login-form" onSubmit={this.go_logIn}>
                            <div className="form-group">
                                <p>
                                    <label className="col-md-4 control-label" htmlFor="textinput">E-mail</label>
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="john.smith@email.com"
                                        value={this.state.email}
                                        onChange={this.updateTB_simple}
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
                                        value={this.state.password}
                                        onChange={this.updateTB_simple}
                                        className="form-control input-md">
                                    </input>
                                </p>
                            </div> {/* end of data*/}
                            {/* create the password reset in Log in */}
                            {/*class ForgotPassword extends Component */}
                          
                            <div className="create-account">
                                <span onClick={this.go_signUp}>Don't have an account? Create account.</span>
                            </div>
                            <div className="form-group">
                                <Link to="aaa">Forget password?</Link> 
                                <div className="col-md-4">
                                    <button id="login-btn" className="btn btn-info" onClick={this.logIn}>Log in</button>
                                </div> {/* end of inner*/}
                            </div> {/* end of forgotpass*/}
                        </form>
                    </div> {/* end of loginform*/}
                    
                </Modal>
            </div>
        );
    }
} // HabitForm COMPONENT
//************************************//
export default SignupAndLogin;
