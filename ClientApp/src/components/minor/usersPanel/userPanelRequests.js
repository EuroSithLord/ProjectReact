import axios from 'axios';

export const getUsersAndRoles = (onSucceed, onFail) => {
    const getUsers = axios.get('api/users');
    const getRoles = axios.get('api/roles');
    
    axios.all([getUsers, getRoles])
        .then(axios.spread((...responses) => {
            onSucceed(responses);
        }))
        .catch(exceptions => {
            onFail(exceptions);
        });
}

export const getUserDetails = (user, onSucceed, onFail) => {
    axios.get(`api/users/${user.id}`)
        .then((response) => {
            onSucceed(response)
        })
        .catch((exception) => {
            onFail(exception);
        })
}

export const removeUser = (user, onSucceed, onFail) => {
    axios.delete("api/users", {data: {
            "id": user.id,
        }})
        .then ((response) => {
            onSucceed(response);
        })
        .catch((exception) => {
            onFail(exception);
        });
}

export const createUser = (user, onSucceed, onFail) => {
    axios.post("api/users/creation", {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "password": user.password,
            "roles": user.role
        })
        .then((response) => {
            onSucceed(response);
        })
        .catch((exception) => {
            onFail(exception);
        })
}

export const editUser = (user, values, onSucceed, onFail) => {
    axios.post("api/users/modification", {
        "userName": values.userName,
        "firstName": values.firstName,
        "lastName": values.lastName,
        "email": values.email,
        "roles": values.roles,
        "id": user.id
    })
        .then((response) => {
            onSucceed(response);
        })
        .catch((exception) => {
            onFail(exception);
        })
}