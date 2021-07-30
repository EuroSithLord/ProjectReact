import React, { useState, useEffect, useRef } from 'react';
import { JsonImports, StyleImports } from './minor/imports';
import { registerRequest } from './minor/authentication/authRequest';
import { useHistory } from 'react-router-dom';

const Register = (props) => {
    const history = useHistory();
    const [state, setState] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        firstName: "",
        lastName: "",
        emptyForm: false,
        badPasswordConfirm: false,
        serverError: false,
        serverMessage: ""
    });
    const { serverError, serverMessage } = state;
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) {
            if (!serverError) {
                StyleImports.Notification["success"]({
                    message: JsonImports.registerNotificationSuccess,
                    description: JsonImports.registerSuccessDetails
                });
                setTimeout(() => { history.push("/"); }, 4.5 * 1000);
            }
            else {
                StyleImports.Notification["error"]({
                    message: JsonImports.registerNotificationFail,
                    description: serverMessage
                });
            }
        }
        else didMountRef.current = true;
        
    }, [serverError, serverMessage, history]);

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        if (state.password === "" || state.email === "" || state.firstName === "" || state.lastName === "") {
            event.preventDefault();
            setState({
                ...state,
                emptyForm: true
            })
            return;
        }
        if (state.password !== state.passwordConfirm) {
            event.preventDefault();
            setState({
                ...state,
                badPasswordConfirm: true
            })
        }
        event.preventDefault();
        registerRequest(state, setState);
    }

    return (
        <StyleImports.PageContainer>
            <StyleImports.InnerPageContainer>
                <StyleImports.AuthFormContainer>
                    <StyleImports.RegisterForm name="registerForm" onSubmit={handleSubmit}>
                        <StyleImports.FormTitle>{JsonImports.registerTitle}</StyleImports.FormTitle>
                        {state.emptyForm ? <StyleImports.FormAlert message={JsonImports.registerErrorEmpty} showIcon type="error" /> :
                            state.badPasswordConfirm ? <StyleImports.FormAlert message={JsonImports.badPasswordConfirm} showIcon type="error" /> : null}
                        <StyleImports.RegisterOuterInput emptyForm={state.emptyForm} badPasswordConfirm={state.badPasswordConfirm}>
                            <StyleImports.InnerInput id="registerFormFirstName" name="firstName" type='text' placeholder={JsonImports.registerFNHint} onChange={handleChange} />
                        </StyleImports.RegisterOuterInput>
                        <StyleImports.RegisterOuterInput emptyForm={state.emptyForm}>
                            <StyleImports.InnerInput id="registerFormLastName" name="lastName" type='text' placeholder={JsonImports.registerLNHint} onChange={handleChange} />
                        </StyleImports.RegisterOuterInput>
                        <StyleImports.RegisterOuterInput emptyForm={state.emptyForm}>
                            <StyleImports.InnerInput id="registerFormEmail" name="email" type='email' placeholder={JsonImports.registerEmailHint} onChange={handleChange} />
                        </StyleImports.RegisterOuterInput>
                        <StyleImports.RegisterOuterInput emptyForm={state.emptyForm}>
                            <StyleImports.InnerInput id="registerFormPassword" name="password" type='password' placeholder={JsonImports.registerPasswordHint} onChange={handleChange} />
                        </StyleImports.RegisterOuterInput>
                        <StyleImports.RegisterOuterInput emptyForm={state.emptyForm} badPasswordConfirm={state.badPasswordConfirm}>
                            <StyleImports.InnerInput id="registerFormPasswordConfirm" name="passwordConfirm" type='password' placeholder={JsonImports.registerPasswordConfirm} onChange={handleChange} />
                        </StyleImports.RegisterOuterInput>
                        <StyleImports.InlineFormContainer>
                            <StyleImports.SubmitButton onClick={handleSubmit}>{JsonImports.registerSubmit}</StyleImports.SubmitButton>
                            <StyleImports.AuthFormLink exact to="/">{JsonImports.registerLink}</StyleImports.AuthFormLink>
                        </StyleImports.InlineFormContainer>
                    </StyleImports.RegisterForm>
                </StyleImports.AuthFormContainer>
            </StyleImports.InnerPageContainer>
        </StyleImports.PageContainer>
    );
}

export default Register;