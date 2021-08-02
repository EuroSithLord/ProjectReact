import axios from "axios";

export const createRoleRequest = (state, onSucceed, onFail) => {
    axios.post("api/roles", { "name": state.name })
        .then((response) => {
            if (response.status === 200) onSucceed(response);
        }).catch((exception) => {
            if (exception.response.status === 400) onFail(exception)
        });
}

export const deleteRoleRequest = (state, onSucceed, onFail) => {
    axios.delete("api/roles", { "name": state.name })
        .then((response) => {
            if (response.status === 200) onSucceed(response);
        }).catch((exception) => {
            if (exception.response.status === 400) onFail(exception)
        });
}

export const getRoleListRequest = (onSucceed) => {
    axios.get("api/roles")
        .then((response) =>{
            console.log(response.data);
            onSucceed(response);
    })
}

// TODO: Unify delete and create roles.
