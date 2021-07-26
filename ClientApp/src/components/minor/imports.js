import { registerFormAuthLink, registerFormSubmit, registerFormEmailHint, registerFormFirstNameHint, registerFormLastNameHint,
    registerFormPasswordHint, registerFormTitle, registerErrorEmptyForm, registerFormPasswordConfirmHint,
    registerErrorBadPasswordConfirm, registerSuccessDetails, registerNotificationSuccess } from "../../json/appFeedback.json";
import { loginErrorBadCredentials, loginErrorEmptyForm, loginFormTitle, loginFormSubmit, loginFormEmailHint, 
    loginFormPasswordHint, authFormRegisterButton } from "../../json/appFeedback.json";
import { PageContainer, InnerPageContainer, AuthFormContainer, AuthForm, FormTitle, OuterInput, InnerInput, 
    SubmitButton, InlineFormContainer, AuthFormLink, RegisterForm, FormAlert, RegisterOuterInput } from "./authentication/authStyles";
import { notification } from "antd";

export class JsonImports {
    static badPasswordConfirm = registerErrorBadPasswordConfirm;
    static registerLink = registerFormAuthLink;
    static registerSubmit = registerFormSubmit;
    static registerEmailHint = registerFormEmailHint;
    static registerFNHint = registerFormFirstNameHint;
    static registerLNHint = registerFormLastNameHint;
    static registerPasswordHint = registerFormPasswordHint;
    static registerTitle = registerFormTitle;
    static registerErrorEmpty = registerErrorEmptyForm;
    static registerPasswordConfirm = registerFormPasswordConfirmHint;
    static registerSuccessDetails = registerSuccessDetails;
    static registerNotificationSuccess = registerNotificationSuccess;

    static loginBadCredentials = loginErrorBadCredentials;
    static loginEmptyForm = loginErrorEmptyForm;
    static loginTitle = loginFormTitle;
    static loginSubmit = loginFormSubmit;
    static loginEmailHint = loginFormEmailHint;
    static loginPWHint = loginFormPasswordHint;
    static loginRegisterBtn = authFormRegisterButton;
}

export class StyleImports {
    static PageContainer = PageContainer;
    static InnerPageContainer = InnerPageContainer;
    static AuthFormContainer = AuthFormContainer;
    static AuthForm = AuthForm;
    static FormTitle = FormTitle;
    static OuterInput = OuterInput;
    static InnerInput = InnerInput;
    static SubmitButton = SubmitButton;
    static InlineFormContainer = InlineFormContainer;
    static AuthFormLink = AuthFormLink;
    static RegisterForm = RegisterForm;
    static FormAlert = FormAlert;
    static RegisterOuterInput = RegisterOuterInput;
    static Notification = notification;
}