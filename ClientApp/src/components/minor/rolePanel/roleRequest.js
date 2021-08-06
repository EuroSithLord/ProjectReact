import axios from "axios";

export const createRole = (state, onSucceed, onFail) => {
    axios.post("api/roles", { "name": state.name })
        .then((response) => {
            if (response.status === 200) onSucceed(response);
        })
        .catch((exception) => {
            if (exception.response.status === 400) onFail(exception);
        });
}

export const deleteRole = (state, onSucceed, onFail) => {
    axios.delete("api/roles", {data: { "name": state.name }})
        .then((response) => {
            if (response.status === 200) onSucceed(response);
        })
        .catch((exception) => {
            if (exception.response.status === 400) onFail(exception)
        });
}

export const changeRole = (role, onSucceed, onFail) => {
    axios.post("api/roles/modification", { "oldName": role.oldName, "newName": role.newName })
        .then((response) => {
            if (response.status === 200) onSucceed(response);
        })
        .catch((exception) => {
            if (exception.response.status === 400) onFail(exception)
        });
}

export const getRoleList = (onSucceed, onFail) => {
    axios.get("api/roles")
        .then((response) =>{
            onSucceed(response);
        })
        .catch((exception) => {
            onFail(exception);
        })
}

// TODO: Unify delete and create roles.
