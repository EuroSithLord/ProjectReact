import { StyleImports, JsonImports } from "./minor/imports";
import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { loginAction } from "../redux/actions/authActions";
import { loginRequest } from "./minor/authentication/authRequest";
import { setCookies } from "../redux/actions/appStartActions";
import { useHistory } from "react-router-dom";
import { setCookie } from "../auxilliary/cookieFunctions";

const Login = (props) => {
    const history = useHistory();
    const { isLoggedIn } = props;

    const [state, setState] = useState({
        password: "",
        email: "",
        userName: "",
        fullName: "",
        badCredentials: false,
        emptyForm: false
    });

    useEffect(() => {
        let unMounted = false;
        if (isLoggedIn === true && unMounted === true) history.push("/");
        else return () => {
            unMounted = true
        };
    }, [history, isLoggedIn])

    const handleChange = (event) => {
        if (state.emptyForm === true) { setState({ ...state, emptyForm: false }); }
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        if (state.password === "" || state.email === "") {
            event.preventDefault();
            setState({
                ...state,
                emptyForm: true
            })
            return;
        }
        event.preventDefault();
        loginRequest(state, 
            (response) => {
                props.loggingIn(response.data.userName, response.data.name);
                setCookie({
                    userName: response.data.userName,
                    fullName: response.data.name, expireDays: 0.125, isLoggedIn: true
                });
                window.location = "/";
            },
            () => {
            setState({ ...state, badCredentials: true });
        });
    }

    return (
        <StyleImports.PageContainer>
            <StyleImports.InnerPageContainer>
                <StyleImports.AuthFormContainer>
                    <StyleImports.AuthForm onSubmit={handleSubmit} name="loginForm">
                        <StyleImports.FormTitle>{JsonImports.loginTitle}</StyleImports.FormTitle>
                        {state.badCredentials ? <StyleImports.FormAlert message={JsonImports.loginBadCredentials} showIcon type="error" /> :
                            state.emptyForm ? <StyleImports.FormAlert message={JsonImports.loginEmptyForm} showIcon type="error" /> : null}
                        <StyleImports.OuterInput badCredentials={state.badCredentials} emptyForm={state.emptyForm}>
                            <StyleImports.InnerInput id="authFormEmail" name="email" type='email' placeholder={JsonImports.loginEmailHint} onChange={handleChange} />
                        </StyleImports.OuterInput>
                        <StyleImports.OuterInput badCredentials={state.badCredentials} emptyForm={state.emptyForm}>
                            <StyleImports.InnerInput id="registerFormPassword" name="password" type='password' placeholder={JsonImports.loginPWHint} onChange={handleChange}/>
                        </StyleImports.OuterInput>
                        <StyleImports.InlineFormContainer>
                            <StyleImports.SubmitButton onClick={handleSubmit}>{JsonImports.loginSubmit}</StyleImports.SubmitButton>
                            <StyleImports.AuthFormLink to="/auth/register">{JsonImports.loginRegisterBtn}</StyleImports.AuthFormLink>
                        </StyleImports.InlineFormContainer>
                    </StyleImports.AuthForm>
                </StyleImports.AuthFormContainer>
            </StyleImports.InnerPageContainer>
        </StyleImports.PageContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        userName: state.userName,
        fullName: state.fullName,
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loggingIn: (userName, fullName) => dispatch(loginAction(userName, fullName)),
        cookiesToState: (userName, fullName, isLoggedIn) => dispatch(setCookies(userName, fullName, isLoggedIn))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);