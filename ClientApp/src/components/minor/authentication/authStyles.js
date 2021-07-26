import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Alert } from "antd";
import 'antd/dist/antd.css';

export const PageContainer = styled.div`
    width: 100%;
    padding: 0px 0px 0px 0px;
    background-color: #ffffff;
    min-height: 100vh;
`

export const InnerPageContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 50px 0px 50px 0px;
    display: flex;
    justify-content: center;
    flex-grow: 1;
`

export const AuthFormContainer = styled.div`
    width: 100%;
    max-width: 350px;
    border: 1px solid #282828;
    border-radius: 10px;
`

export const AuthForm = styled.form`
    width:100%;
    padding: 50px 20px 50px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
`

export const FormTitle = styled.h1`
    text-align: center;
    font-family: "Verdana, san-serif";
    color: #282828;
    margin: 0;
`

export const InlineFormContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export const OuterInput = styled.div`
    width: 100%;
    border: 1px solid #282828;
    font-family: "Verdana, san-serif";
    padding: 5px 10px 5px 10px;
    background: #ffffff;
    outline: none;
    :nth-of-type(${props => props.emptyForm ? 2 : props.badCredentials ? 2 : 1}){
        ${props =>props.emptyForm ? "margin-top: 0px; margin-bottom: 10px;" : 
        props.badCredentials ? "margin-top: 0px; margin-bottom: 10px;" : "margin-top: 30px; margin-bottom: 10px;" }
    }
    :nth-of-type(${props => props.emptyForm ? 3 : props.badCredentials ? 3 : 2}){
        ${props =>props.emptyForm ? "margin-top: 0px; margin-bottom: 30px;" : 
        props.badCredentials ? "margin-top: 0px; margin-bottom: 30px;" : "margin-top: 0px; margin-bottom: 30px;" }
    }
`

export const InnerInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-family: "Verdana, san-serif";
    color: #282828;
    font-size: 16px;
    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset !important;
    }
`

export const SubmitButton = styled.button`
    width: calc(50% - 5px);
    padding: 10px 0px 10px 0px;
    text-align: center;
    color: #ffffff;
    background: #282828;
    font-size: 20px;
    font-weight: 400;
    border: none;
    outline: none;
    font-family: "Verdana, san-serif";
`

export const FormAlert = styled(Alert)`
    margin-top: 30px;
    margin-bottom: 10px;
`

export const AuthFormLink = styled(NavLink)`
    width: calc(50% - 5px);
    background: #EDCBC2;
    color: #282828;
    font-family: "Verdana, san-serif";
    font-size: 20px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    :hover {
        color: #282828;
        background: #EDCBC2;
    }
`

export const RegisterForm = styled.form`
    width:100%;
    padding: 50px 20px 50px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
`

export const RegisterOuterInput = styled.div`
    width: 100%;
    border: 1px solid #282828;
    font-family: "Verdana, san-serif";
    padding: 5px 10px 5px 10px;
    background: #ffffff;
    outline: none;
    margin-bottom: 10px;
    :nth-of-type(${props => props.emptyForm ? 2 : props.emptyBadPasswordConfirm ? 2 : 1}) {
        margin-bottom: 10px;
        ${props => props.emptyForm ? "margin-top: 0px" : props.badPasswordConfirm ? "margin-top: 0px" : "margin-top: 30px;"}
    }
    :nth-of-type(${props => props.emptyForm ? 6 : props.badPasswordConfirm ? 6 : 5}) {
        margin-bottom: 30px;
        ${props => props.emptyForm ? "margin-bottom: 30px" :  props.badPasswordConfirm ? "margin-bottom: 30px;" : "margin-bottom: 30px;"}
    }
`
