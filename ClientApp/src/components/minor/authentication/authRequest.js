import axios from "axios";
import { setCookie } from "../../../auxilliary/cookieFunctions";

export const loginRequest = (state, setState, props) => {
    axios.post("api/auth", { "email": state.email, "password": state.password })
    .then((response) => {
        let credentials = false;
        if (response.status === 200) {
            setState({
            ...state,
            userName: response.data.userName,
            fullName: response.data.fullName,
            modalVisible: credentials,
            });
            props.loggingIn(response.data.userName, response.data.fullName);
            setCookie({userName: response.data.userName, 
                fullName: response.data.fullName, expireDays: 10, isLoggedIn: true});
        }
    }).catch(exception => {
        if (exception.response.status === 400) setState({...state, badCredentials: true});
    });
}

export const registerRequest = (state, setState, props) => {
    axios.post("api/auth/register", { 
        "email": state.email, "password": state.password, "userName": state.userName, "firstName": state.firstName, "lastName": state.lastName
    }).then((response) => {
        if (response.status === 200) {
            return true;
        }
    }).catch((exception) => {
        console.log(exception.response.data);
    });
}