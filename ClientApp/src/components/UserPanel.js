import React, { useEffect, useState } from 'react';
import { IconImports, JsonImports, StyleImports } from './minor/imports';
import { Button, Table, Modal } from 'antd';
import { getUsersAndRoles, removeUser, createUser, editUser, getUserDetails } from './minor/usersPanel/userPanelRequests';
import { connect } from "react-redux";
import { usersTableColumns } from './minor/usersPanel/usersTableColumns';
import { ModalEditForm, ModalCreateForm } from './minor/usersPanel/userPanelModalForm';
import { UserDetailsCard } from './minor/usersPanel/userPanelCards';

const UserPanel = (props) => {
    const [state, setState] = useState({
        loading: true,
        users: [],
        roles: [],
        userEditMode: false,
        userCreateMode: false,
        userDetailsMode: false,
        editedUser: {},
        userSelected: {},
        editUserFormEmpty: false,
        createUserFormEmpty: false
    });

    useEffect(() => {
        let unMounted = false;
        if (unMounted === false && props.isLoggedIn === "true") {
            getUsersAndRoles((responses) => {
                const users = responses[0].data.map((row, index) => ({
                    key: index,
                    name: row.name,
                    userName: row.userName,
                    email: row.email,
                    id: row.id
                    //role: row.result.role.length === 0 ? JsonImports.userPanelNoRole : row.result.role
                }));
                setState({
                    ...state,
                    loading: false,
                    users: users,
                    roles: responses[1].data
                });
            }, (exceptions) => {
                StyleImports.Notification["error"]({
                    message: JsonImports.userPanelError,
                    description: exceptions.response.data
                })
            });
        }
        return () => {
            unMounted = true;
        }
    }, []);

    const handleDetailsMode = (key) => {
        const user = state.users.find(user => user.key === key);
        getUserDetails(user, (response) => {
            setState({
                ...state,
                userSelected: response.data,
                userDetailsMode: true
            })
        }, (exception) => {
            console.log(exception.response);
        });
    }

    const handleEditMode = (key) => {
        const user = state.users.find(user => user.key === key);
        setState({
            ...state,
            userSelected: user,
            userEditMode: true,
        });
    }

    const handleRemoveUser = (key) => {
        const user = state.users.find(user => user.key === key);
        removeUser(user, (response) => {
            const users = response.data.users.map((row, index) => ({
                key: index,
                name: row.result.name,
                userName: row.result.userName,
                email: row.result.email,
                role: row.result.role.length === 0 ? JsonImports.userPanelNoRole : row.result.role
            }));
            setState({
                ...state,
                users: users,
            });
            StyleImports.Notification["success"]({
                message: JsonImports.userPanelRemoveSuccess,
                description: response.data.message
            });
        }, (exception) => {
            StyleImports.Notification["error"]({
                message: JsonImports.userPanelRemoveError,
                description: exception.response.data
            });
        })
    }

    const handleEditFinish = (values) => {
        const properties = [values.firstName, values.lastName, values.email, values.userName, values.roles];
        if (properties.some(property => property !== undefined)) {
            editUser(state.userSelected, values, (response) => {
                const users = response.data.users.map((row, index) => ({
                    key: index,
                    name: row.result.name,
                    userName: row.result.userName,
                    email: row.result.email,
                    role: row.result.role.length === 0 ? JsonImports.userPanelNoRole : row.result.role,
                    id: row.result.id
                }));
                setState({
                    ...state,
                    users: users,
                    userEditMode: false
                });
                StyleImports.Notification["success"]({
                    message: JsonImports.userPanelEditSuccess,
                    description: response.data.message
                });
            }, (exception) => {
                StyleImports.Notification["error"]({
                message: JsonImports.userPanelEditError,
                description: exception.response.data
            });
            })
            return;
        }
        setState({
            ...state,
            editUserFormEmpty: true
        });
    }

    const handleCreateFinish = (values) => {
        const properties = [values.firstName, values.lastName, values.email, values.role, values.password];
        if (properties.every(property => property !== undefined)) {
            createUser(values, (response) => {
                const users = response.data.users.map((row, index) => ({
                    key: index,
                    name: row.result.name,
                    userName: row.result.userName,
                    email: row.result.email,
                    role: row.result.role.length === 0 ? JsonImports.userPanelNoRole : row.result.role
                }));
                setState({
                    ...state,
                    users: users,
                    userCreateMode: false
                });
                StyleImports.Notification["success"]({
                    message: JsonImports.userPanelCreateUserSuccess,
                    description: response.data.message
                });
            }, (exception) => {
                StyleImports.Notification["error"]({
                    message: JsonImports.userPanelCreateUserError,
                    description: exception.response.data.message
                });
            });
            return;
        }
        setState({
            ...state,
            createUserFormEmpty: true
        });
    }

    const handleCreateCancel = () => {
        setState({
            ...state, 
            userCreateMode: false
        });
    }

    const handleEditCancel = () => {
        setState({
            ...state, 
            userEditMode: false
        });
    }

    const handleDetailsCancel = () => {
        setState({
            ...state,
            userDetailsMode: false
        })
    }

    const handleOpenCreate = () => {
        setState({
            ...state,
            userCreateMode: true
        });
    }

    const columns = usersTableColumns(handleEditMode, handleRemoveUser, handleDetailsMode);

    return(
        <>
            <StyleImports.LoadingSpin tip={JsonImports.loadingHint} indicator={IconImports.LoadingIcon} spinning={state.loading}/>
            <StyleImports.TableContainer>
                {
                    !state.loading ? 
                    <>
                        <StyleImports.PageTitle>{ JsonImports.userPanelTitle }</StyleImports.PageTitle>
                        <Table rowKey={record => record.key} columns={columns} dataSource={state.users} style={{overflow: "auto"}}/>
                        <Button type="primary" onClick={handleOpenCreate}>{ JsonImports.userPanelAddUser }</Button>
                    </> : null
                }
                
            </StyleImports.TableContainer>
            <Modal
                title={state.userSelected.name}
                visible={state.userDetailsMode}
                onCancel={handleDetailsCancel}
                onOk={handleDetailsCancel}
                destroyOnClose
            >
                <UserDetailsCard user={state.userSelected} />
            </Modal>
            <Modal
                title={JsonImports.userPanelEditModalTitle}
                visible={state.userEditMode}
                onCancel={handleEditCancel}
                footer={null}
                destroyOnClose
            >
                {
                    state.editUserFormEmpty ?
                    <StyleImports.GlobalFormAlert message={JsonImports.userPanelEmptyForm} showIcon type="error" /> : null
                }
                <ModalEditForm 
                    userToEdit={state.userSelected}
                    roles={state.roles}
                    handleEditFinish={handleEditFinish}
                    handleEditCancel={handleEditCancel}
                />
            </Modal>
            <Modal
                title={JsonImports.userPanelCreateModalTitle}
                visible={state.userCreateMode}
                onCancel={handleCreateCancel}
                footer={null}
                destroyOnClose
            >
                {
                    state.createUserFormEmpty ?
                    <StyleImports.GlobalFormAlert message={JsonImports.userPanelEmptyCreate} showIcon type="error" /> : null
                }
                <ModalCreateForm 
                    roles={state.roles}
                    handleCreateFinish={handleCreateFinish}
                    handleCreateCancel={handleCreateCancel}
                />
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(UserPanel);
