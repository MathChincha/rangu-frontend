import axios from 'axios'

axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

const apiUsers = axios.create({
    baseURL: 'https://rangu-users.herokuapp.com/api/rangu/v1'
})

export {
    apiUsers
};

const apiLogin = axios.create({
    baseURL: 'https://rangu-oauth.herokuapp.com/api/rangu/v1/security/oauth'
})

export {
    apiLogin
};

const apiMenu = axios.create({
    baseURL: 'https://rangu-menu.herokuapp.com/api/rangu/v1',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
})

export {
    apiMenu
};

const apiOrders = axios.create({
    baseURL: 'https://rangu-orders.herokuapp.com/api/rangu/v1/orders'
})

export {
    apiOrders
};

const apiOrchestrate = axios.create({
    baseURL: 'https://rangu-orchestrate.herokuapp.com/api/rangu/v1/'
})

export {
    apiOrchestrate
};

