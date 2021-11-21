import axios from 'axios'

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
    baseURL: 'https://rangu-menu.herokuapp.com/api/rangu/v1'
})

export {
    apiMenu
};

const apiOrders = axios.create({
    baseURL: 'https://rangu-orders.herokuapp.com/api/rangu/v1'
})

export {
    apiOrders
};