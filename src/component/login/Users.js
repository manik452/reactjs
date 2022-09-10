import React, { useEffect, useState } from 'react'
import userRefressToken from '../../hooks/UserRefressToken';
import useAxios from "../../hooks/useAxios";
import axios from "../../api/axios";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Users = () => {
    const [users, setUsers] = useState();
    const refresh = userRefressToken();
    const axiosPrivate = useAxiosPrivate();

   /* const [response, error, loading] = useAxios({
        axiosInstance: axios,
        method: 'GET',
        url: '/users',
        checkCredentials: true,
        requestConfig: {
            headers: {
                'Content-Language': 'en-US'
            }
        }
    });*/
   

    useEffect(() => {

        let isMount = true;
        const controller = new AbortController();
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                signal: controller.signal
            });
                console.log(response.data);
                isMount && setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        getUser();
        return () => {
            isMount = false;
            controller.abort();
        }
        
    }, []);

    return (
        <article>
            <p>Users List</p>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => <li key={i} > {user?.username}</li>)}
                </ul>
            ) : (
                <h1> There is no user list  </h1>
            )}
            <button onClick={() => refresh()}> Refresh </button>
        </article>
    );
};

export default Users;