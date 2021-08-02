import React from 'react';
import {
    registerFormAuthLink, registerFormSubmit, registerFormEmailHint, registerFormFirstNameHint, registerFormLastNameHint,
    registerFormPasswordHint, registerFormTitle, registerErrorEmptyForm, registerFormPasswordConfirmHint,
    registerErrorBadPasswordConfirm, registerSuccessDetails, registerNotificationSuccess, registerNotificationFail
} from "../../json/appFeedback.json";
import {
    loginErrorBadCredentials, loginErrorEmptyForm, loginFormTitle, loginFormSubmit, loginFormEmailHint,
    loginFormPasswordHint, authFormRegisterButton
} from "../../json/appFeedback.json";
import {
    navbarAppTitle, navbarAuthButton, navbarDashboardButton, navbarHomeButton
} from "../../json/appFeedback.json";
import {
    menuItemAddRole, menuItemUserInbox, menuItemUsersPanel, menuItemDeleteRole
} from '../../json/appFeedback.json';
import {
    createRoleFormLabel, createRoleFormReset, createRoleFormSubmit, createRoleFormTitle, createRoleFormPlaceholder,
    createRoleFail, createRoleSuccess, deleteRoleFormLabel, deleteRoleFormReset, deleteRoleFormSubmit, deleteRoleFormTitle, deleteRoleFormPlaceholder,
    deleteRoleFail, deleteRoleSuccess
} from '../../json/appFeedback.json';
import {
    userPanelSubmit, userPanelTableRolesSelectPlaceholder, userPanelEditButton, userPanelSaveEditButton, userPanelErrorTitle, errorUserNoRole, userPanelTitle,
    userPanelModalTitle, userPanelCancelEdit, userPanelModalNewEmailHint, userPanelModalNewNameHint, userPanelModalNewUserNameHint, userPanelModalNewRoleHint,
    userPanelModalOldEmailHint, userPanelModalOldNameHint, userPanelModalOldRoleHint, userPanelModalOldUserNameHint, userPanelModalUserSelectPlaceholder
} from '..//../json/appFeedback.json';
import { loadingHint } from '../../json/appFeedback.json';
import {
    PageContainer, InnerPageContainer, AuthFormContainer, AuthForm, FormTitle, OuterInput, InnerInput,
    SubmitButton, InlineFormContainer, AuthFormLink, RegisterForm, FormAlert, RegisterOuterInput
} from "./authentication/authStyles";
import { 
    UserOutlined, MailOutlined, ControlOutlined, UserAddOutlined, UserDeleteOutlined, LoadingOutlined
} from "@ant-design/icons";
import { 
    DocumentContainer, ContentContainer, FormContainer, PageTitle, LayoutInnerContainer, TableContainer
} from "./appStyles";
import { notification, Spin } from "antd";

const loadIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
    static registerNotificationFail = registerNotificationFail;

    static loginBadCredentials = loginErrorBadCredentials;
    static loginEmptyForm = loginErrorEmptyForm;
    static loginTitle = loginFormTitle;
    static loginSubmit = loginFormSubmit;
    static loginEmailHint = loginFormEmailHint;
    static loginPWHint = loginFormPasswordHint;
    static loginRegisterBtn = authFormRegisterButton;

    static appTitle = navbarAppTitle;
    static authButton = navbarAuthButton;
    static dashboardButton = navbarDashboardButton;
    static homeButton = navbarHomeButton;

    static addRole = menuItemAddRole;
    static userInbox = menuItemUserInbox;
    static usersPanel = menuItemUsersPanel;
    static deleteRole = menuItemDeleteRole;

    static createRoleLabel = createRoleFormLabel;
    static createRoleReset = createRoleFormReset;
    static createRoleSubmit = createRoleFormSubmit;
    static createRoleTitle = createRoleFormTitle;
    static createRolePlaceholder = createRoleFormPlaceholder;
    static createRoleFail = createRoleFail;
    static createRoleSuccess = createRoleSuccess;

    static deleteRoleLabel = deleteRoleFormLabel;
    static deleteRoleReset = deleteRoleFormReset;
    static deleteRoleSubmit = deleteRoleFormSubmit;
    static deleteRoleTitle = deleteRoleFormTitle;
    static deleteRolePlaceholder = deleteRoleFormPlaceholder;
    static deleteRoleFail = deleteRoleFail;
    static deleteRoleSuccess = deleteRoleSuccess;

    static loadingHint = loadingHint;

    static userPanelSubmit = userPanelSubmit;
    static userPanelPlaceholder = userPanelTableRolesSelectPlaceholder;
    static userPanelEdit = userPanelEditButton;
    static userPanelSaveEdit = userPanelSaveEditButton;
    static userPanelError = userPanelErrorTitle;
    static userPanelNoRole = errorUserNoRole;
    static userPanelTitle = userPanelTitle;
    static userPanelModalTitle = userPanelModalTitle;
    static userPanelCancelEdit = userPanelCancelEdit;
    static userPanelNewEmail = userPanelModalNewEmailHint;
    static userPanelNewName = userPanelModalNewNameHint;
    static userPanelNewUserName = userPanelModalNewUserNameHint;
    static userPanelNewRole = userPanelModalNewRoleHint;
    static userPanelOldEmail = userPanelModalOldEmailHint;
    static userPanelOldName = userPanelModalOldNameHint;
    static userPanelOldUserName = userPanelModalOldUserNameHint;
    static userPanelOldRole = userPanelModalOldRoleHint;
    static userPanelUserPlacehold = userPanelModalUserSelectPlaceholder;
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
    static DocumentContainer = DocumentContainer;
    static ContentContainer = ContentContainer;
    static FormContainer = FormContainer;
    static PageTitle = PageTitle;
    static ContainerInnerContainer = LayoutInnerContainer;
    static TableContainer = TableContainer;
    static LoadingSpin = Spin;
    static InlineContainer = InlineFormContainer;
}

export class IconImports {
    static UserIcon = UserOutlined;
    static UserAddIcon = UserAddOutlined;
    static ControlIcon = ControlOutlined;
    static MailIcon = MailOutlined;
    static UserDeleteIcon = UserDeleteOutlined;
    static LoadingIcon = loadIcon;
}
