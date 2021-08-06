import React, { useEffect, useState } from 'react';
import { IconImports, JsonImports, StyleImports } from './minor/imports';
import { Button, Table, Modal } from 'antd';
import { connect } from "react-redux";
import { rolesTableColumns } from './minor/rolePanel/rolesTableColumns';
import { CreateRole } from './minor/rolePanel/CreateRole';
import { EditRole } from './minor/rolePanel/EditRole';
import { changeRole, createRole, deleteRole, getRoleList } from './minor/rolePanel/roleRequest';

const RolePanel = (props) => {
    const [state, setState] = useState({
        loading: true,
        roles: [],
        roleEditMode: false,
        roleCreateMode: false,
        editedRole: {},
        roleToEdit: {},
        editRoleFormEmpty: false,
        createRoleFormEmpty: false
    });

    useEffect(() => {
        let unMounted = false;
        if (unMounted === false && props.isLoggedIn === "true") {
        getRoleList((response) => {
            const roles = response.data.map((row, index) => ({
                key: index,
                name: row.name,
            }));
            setState({
                ...state,
                loading: false,
                roles: roles
            });
        }, (exceptions) => {
            StyleImports.Notification["error"]({
                message: JsonImports.rolePanelError,
                description: exceptions.response.data
            })
        });
        }
        return () => {
            unMounted = true;
        }
    }, []);

    const handleEditMode = (key) => {
        const role = state.roles.find(role => role.key === key);
        setState({
            ...state,
            roleToEdit: role,
            roleEditMode: true,
        });
    }

    const handleRemoveRole = (event) => {
        const node = parseInt(event.target.parentElement.parentElement.parentElement.dataset.rowKey);
        const role = state.roles.filter(user => user.key === node);
        deleteRole(role[0], (response) => {
            const roles = response.data.roles.map((row, index) => ({
                    key: index,
                    name: row.name,
                }));
            setState({
                ...state,
                roles: roles,
            });
            StyleImports.Notification["success"]({
                message: JsonImports.deleteRoleSuccess,
                description: response.data.message
            });
        }, (exception) => {
            StyleImports.Notification["error"]({
                message: JsonImports.deleteRole,
                description: exception.response.data.message
            });
        })
    }

    const handleEditFinish = (values) => {
        console.log(values);
        if (values.newName !== undefined) {
            changeRole(values, (response) => {
                const roles = response.data.roles.map((row, index) => ({
                    key: index,
                    name: row.name,
                }));
                setState({
                    ...state,
                    roles: roles,
                    roleEditMode: false
                });
                StyleImports.Notification["success"]({
                    message: JsonImports.editRoleSuccess,
                    description: response.data.message
                });
            }, (exception) => {
                StyleImports.Notification["error"]({
                    message: JsonImports.editRoleSuccess,
                    description: exception.response.data.message
                });
            });
            return;
        }
        setState({
            ...state,
            editRoleFormEmpty: true
        });
    }

    const handleCreateFinish = (values) => {
        if (values.name !== undefined) {
            createRole(values, (response) => {
                const roles = response.data.roles.map((row, index) => ({
                    key: index,
                    name: row.name,
                }));
                setState({
                    ...state,
                    roles: roles,
                    roleCreateMode: false
                });
                StyleImports.Notification["success"]({
                    message: JsonImports.createRoleSuccess,
                    description: response.data.message
                });
            }, (exception => {
                StyleImports.Notification["error"]({
                    message: JsonImports.createRoleFail,
                    description: exception.response.data.message
                });
            }));
            return;
        }
        setState({
            ...state,
            createRoleFormEmpty: true
        });
    }

    const handleCreateCancel = () => {
        setState({
            ...state, 
            roleCreateMode: false
        });
    }

    const handleEditCancel = () => {
        setState({
            ...state, 
            roleEditMode: false
        });
    }

    const handleOpenCreate = () => {
        setState({
            ...state,
            roleCreateMode: true
        });
    }

    const columns = rolesTableColumns(handleEditMode, handleRemoveRole);

    return(
        <>
            <StyleImports.LoadingSpin tip={JsonImports.loadingHint} indicator={IconImports.LoadingIcon} spinning={state.loading}/>
            <StyleImports.TableContainer>
                {
                    !state.loading ? 
                    <>
                        <StyleImports.PageTitle>{ JsonImports.rolePanelTitle }</StyleImports.PageTitle>
                        <Table rowKey={record => record.key} columns={columns} dataSource={state.roles}/>
                        <Button type="primary" onClick={handleOpenCreate}>{ JsonImports.rolePanelAddRole }</Button>
                    </> : null
                }
                
            </StyleImports.TableContainer>
            <Modal
                title={JsonImports.rolePanelEditModalTitle}
                visible={state.roleEditMode}
                onCancel={handleEditCancel}
                footer={null}
                destroyOnClose
            >
                {
                    state.editRoleFormEmpty ?
                    <StyleImports.GlobalFormAlert message={JsonImports.rolePanelEmptyForm} showIcon type="error" /> : null
                }
                <EditRole
                    roleToEdit={state.roleToEdit}
                    roles={state.roles}
                    handleEditFinish={handleEditFinish}
                    handleEditCancel={handleEditCancel}
                />
            </Modal>
            <Modal
                title={JsonImports.rolePanelCreateModalTitle}
                visible={state.roleCreateMode}
                onCancel={handleCreateCancel}
                footer={null}
                destroyOnClose
            >
                {
                    state.createRoleFormEmpty ?
                    <StyleImports.GlobalFormAlert message={JsonImports.rolePanelEmptyCreate} showIcon type="error" /> : null
                }
                <CreateRole
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

export default connect(mapStateToProps)(RolePanel);
