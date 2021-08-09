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
    menuItemUserInbox, menuItemUsersPanel, menuItemRolesPanel
} from '../../json/appFeedback.json';
import {
    createRoleFormLabel, createRoleFormReset, createRoleFormSubmit, createRoleFormTitle, createRoleFail, createRoleSuccess, 
    deleteRoleFail, deleteRoleSuccess, rolePanelErrorTitle, rolePanelTitle,
    rolePanelEditButton, rolePanelRemove, rolePanelEditModalTitle, rolePanelEmptyForm, editRoleOldName, editRoleNewName,
    rolePanelAddRole, rolePanelCreateModalTitle, rolePanelEmptyCreate, rolePanelCreateCancel, rolePanelEditCancel, rolePanelSaveEdit,
    rolePanelResetEdit, rolePanelSaveCreate, rolePanelResetCreate, editRoleSuccess, editRoleFail, rolePanelCreateEmptyName
} from '../../json/appFeedback.json';
import {
    userPanelAddUser, userPanelTableRolesSelectPlaceholder, userPanelEditButton, userPanelSaveEditButton, userPanelErrorTitle, errorUserNoRole, userPanelTitle,
    userPanelEditModalTitle, userPanelCancelEdit, userPanelModalNewEmailHint, userPanelModalNewFNameHint, userPanelModalNewLNameHint, userPanelModalNewUserNameHint, userPanelModalNewRoleHint,
    userPanelModalOldEmailHint, userPanelModalOldNameHint, userPanelModalOldRoleHint, userPanelModalOldUserNameHint, userPanelModalEmptyForm, userPanelRemoveUser,
    userPanelRemoveUserError, userPanelRemoveUserSuccess, userPanelCreateModalTitle, userPanelCreateEmailHint, userPanelCreateRoleHint, userPanelCreateReset, userPanelCreateFNameHint,
    userPanelCreateLNameHint, userPanelCreateUserError, userPanelCreateUserSuccess, userPanelCreatePasswordHint, userPanelCreateCancel, userPanelCreateSubmit, userPanelResetEdit,
    userPanelEmptyCreate, userPanelEditSuccess, userPanelEditError, userPanelDetailsButton, userPanelDetailsEmail, userPanelDetailsName, userPanelDetailsUsername,
    userPanelDetailsRoles, userPanelCreateMissingEmail, userPanelCreateMissingRoles, userPanelCreateMissingLName, userPanelCreateMissingFName, userPanelCreateMissingPassword
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
    DocumentContainer, ContentContainer, FormContainer, PageTitle, LayoutInnerContainer, TableContainer, GlobalFormAlert, CardGroup, CustomPrimaryTitle,
    CustomSecondTitle, CustomTertiaryTitle
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

    static userInbox = menuItemUserInbox;
    static usersPanel = menuItemUsersPanel;
    static rolesPanel = menuItemRolesPanel;

    static createRoleLabel = createRoleFormLabel;
    static createRoleReset = createRoleFormReset;
    static createRoleSubmit = createRoleFormSubmit;
    static createRoleTitle = createRoleFormTitle;
    static createRoleFail = createRoleFail;
    static createRoleSuccess = createRoleSuccess;

    static deleteRoleFail = deleteRoleFail;
    static deleteRoleSuccess = deleteRoleSuccess;

    static rolePanelError = rolePanelErrorTitle;
    static rolePanelTitle = rolePanelTitle;
    static rolePanelEdit = rolePanelEditButton;
    static rolePanelRemove = rolePanelRemove;
    static rolePanelEditModalTitle = rolePanelEditModalTitle;
    static rolePanelEmptyForm = rolePanelEmptyForm;
    static editRoleNewName = editRoleNewName;
    static editRoleOldName = editRoleOldName;
    static rolePanelAddRole = rolePanelAddRole;
    static rolePanelCreateModalTitle = rolePanelCreateModalTitle;
    static rolePanelEmptyCreate = rolePanelEmptyCreate;
    static rolePanelCreateCancel = rolePanelCreateCancel;
    static rolePanelEditCancel = rolePanelEditCancel;
    static rolePanelSaveEdit = rolePanelSaveEdit;
    static rolePanelResetEdit = rolePanelResetEdit;
    static rolePanelSaveCreate = rolePanelSaveCreate;
    static rolePanelResetCreate = rolePanelResetCreate;
    static rolePanelCreateEmptyName = rolePanelCreateEmptyName;
    static editRoleSuccess = editRoleSuccess;
    static editRoleFail = editRoleFail;

    static loadingHint = loadingHint;

    static userPanelAddUser = userPanelAddUser;
    static userPanelPlaceholder = userPanelTableRolesSelectPlaceholder;
    static userPanelEdit = userPanelEditButton;
    static userPanelRemove = userPanelRemoveUser;
    static userPanelSaveEdit = userPanelSaveEditButton;
    static userPanelError = userPanelErrorTitle;
    static userPanelNoRole = errorUserNoRole;
    static userPanelTitle = userPanelTitle;
    static userPanelEditModalTitle = userPanelEditModalTitle;
    static userPanelCancelEdit = userPanelCancelEdit;
    static userPanelNewEmail = userPanelModalNewEmailHint;
    static userPanelNewFName = userPanelModalNewFNameHint;
    static userPanelNewLName = userPanelModalNewLNameHint;
    static userPanelNewUserName = userPanelModalNewUserNameHint;
    static userPanelNewRole = userPanelModalNewRoleHint;
    static userPanelOldEmail = userPanelModalOldEmailHint;
    static userPanelOldName = userPanelModalOldNameHint;
    static userPanelOldUserName = userPanelModalOldUserNameHint;
    static userPanelOldRole = userPanelModalOldRoleHint;
    static userPanelResetEdit = userPanelResetEdit;
    static userPanelEmptyForm = userPanelModalEmptyForm;
    static userPanelRemoveError = userPanelRemoveUserError;
    static userPanelRemoveSuccess = userPanelRemoveUserSuccess;
    static userPanelCreateModalTitle = userPanelCreateModalTitle;
    static userPanelCreateEmail = userPanelCreateEmailHint;
    static userPanelCreateCancel = userPanelCreateCancel;
    static userPanelCreatePassword = userPanelCreatePasswordHint;
    static userPanelCreateRole = userPanelCreateRoleHint;
    static userPanelCreateReset = userPanelCreateReset;
    static userPanelCreateSubmit = userPanelCreateSubmit;
    static userPanelCreateUserError = userPanelCreateUserError;
    static userPanelCreateUserSuccess = userPanelCreateUserSuccess;
    static userPanelCreateFName = userPanelCreateFNameHint;
    static userPanelCreateLName = userPanelCreateLNameHint;
    static userPanelEmptyCreate = userPanelEmptyCreate;
    static userPanelEditError = userPanelEditError;
    static userPanelEditSuccess = userPanelEditSuccess;
    static userPanelDetails = userPanelDetailsButton;
    static userPanelDetailsEmail = userPanelDetailsEmail;
    static userPanelDetailsName = userPanelDetailsName;
    static userPanelDetailsUsername = userPanelDetailsUsername;
    static userPanelDetailsRoles = userPanelDetailsRoles;
    static userPanelCreateMissingEmail = userPanelCreateMissingEmail;
    static userPanelCreateMissingFName = userPanelCreateMissingFName;
    static userPanelCreateMissingLName = userPanelCreateMissingLName;
    static userPanelCreateMissingPassword = userPanelCreateMissingPassword;
    static userPanelCreateMissingRoles = userPanelCreateMissingRoles;
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
    static GlobalFormAlert = GlobalFormAlert;
    static CustomPrimaryTitle = CustomPrimaryTitle;
    static CustomSecondaryTitle = CustomSecondTitle
    static CustomTertiaryTitle = CustomTertiaryTitle;
    static CardGroup = CardGroup;
}

export class IconImports {
    static UserIcon = UserOutlined;
    static UserAddIcon = UserAddOutlined;
    static ControlIcon = ControlOutlined;
    static MailIcon = MailOutlined;
    static UserDeleteIcon = UserDeleteOutlined;
    static LoadingIcon = loadIcon;
}
