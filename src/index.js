import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Contex from './context/Contex';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/*<Router>
                <Routes>
                    <Route path='/*' element={<App/> } />
                </Routes>
        </Router>*/}
        {/* <Router>
            <Routes>
                <Route path="/" element={<App />}>
                </Route>
            </Routes>
        </Router>*/}
        <Contex>
            <App />
        </Contex>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a functi
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
