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
    axios.delete("api/roles", {data: { "id": state.id }})
        .then((response) => {
            if (response.status === 200) onSucceed(response);
        })
        .catch((exception) => {
            if (exception.response.status === 400) onFail(exception)
        });
}

export const changeRole = (role, roleSelected, onSucceed, onFail) => {
    axios.post("api/roles/modification", { "id": roleSelected.id, "name": role.name })
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
