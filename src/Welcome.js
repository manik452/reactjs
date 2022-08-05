import React, { Component } from 'react';



function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
/*
class Welcome extends Component {
    render(props) {
        return <h1>Hello, {props.name}</h1>
            ;
    }
}*/
export default Welcome;