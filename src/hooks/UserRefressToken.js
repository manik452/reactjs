import React from 'react'
import { Link } from 'react-router-dom'
import { CartState } from "../context/Contex"
import useAxios from "../hooks/useAxios";
import axios from "../api/axios";


const UserRefressToken = () => {
    const { setAuth } = CartState();
    const [response, error, loading] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/refresh',
        checkCredentials: true,
        requestConfig: {
            headers: {
                'Content-Language': 'en-US'
            }
        }
    });
    const refresh = async () => {


        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            return { ...prev, roles: response.data.roles, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }

    return refresh;

}

export default UserRefressToken;