import axios from "axios";

export const loginRequest = (state, onSucceed, onCatch) => {
    axios.post("api/auth", { "email": state.email, "password": state.password })
        .then((response) => {
            if (response.status === 200) onSucceed(response);
        }).catch(exception => {
            if (exception.response.status === 400) onCatch();
        });
}

export const registerRequest = (state, setState) => {
    axios.post("api/auth/registration", {
        "email": state.email, "password": state.password, "firstName": state.firstName, "lastName": state.lastName
    }).then((response) => {
        if (response.status === 200) {
            setState({
                ...state,
                serverError: false
            });
        }
    }).catch((exception) => {
        setState({
            ...state,
            serverMessage: exception.response.data,
            serverError: true,
        });
    });
}