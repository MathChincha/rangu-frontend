import axios from 'axios'

const apiUsers = axios.create({
    baseURL: 'https://rangu-users.herokuapp.com/api/rangu/v1'
})

export {
    apiUsers
};