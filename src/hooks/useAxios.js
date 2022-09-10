import { useEffect, useState } from "react";


const useAxios = (configObj) => {
    const {
        axiosInstance,
        method,
        url,
        checkCredentials,
        requestConfig = {}
    } = configObj;

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(0);
    /*const [response, setResponse] = useState([]);*/


    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const fetchData = async () => {
            try {
                const res = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: controller.signal,
                    withCredentials: checkCredentials
                });
                console.log(res);
                setResponse(res.data);

            } catch (err) {
                console.log(err);
                setError(err.message)
            } finally {
                setLoading(false);
            }

        }

        fetchData();
        /* UseEffect cleanup function*/

        return () => controller.abort();

    }, [])

    return [response, error, loading];
}
export default useAxios;