import axios from 'axios';

const BASE_URL = 'http://localhost:8001';

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
/*,
 * 
 * ,
        'Access-Control-Allow-Credentials': 'true',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"


 * res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
    headers: {
        'Content-Type': 'application/json'
    }
    
    ,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    */