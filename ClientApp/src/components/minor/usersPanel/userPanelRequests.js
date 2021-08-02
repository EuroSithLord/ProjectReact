import axios from 'axios';

const getUsers = axios.get('api/users');
const getRoles = axios.get('api/roles');

export const getUsersAndRoles = (onSucceed, onFail) => {
    axios.all([getUsers, getRoles])
        .then(axios.spread((...responses) => {
            onSucceed(responses);
        })).catch(exceptions => {
            onFail(exceptions);
        });
}