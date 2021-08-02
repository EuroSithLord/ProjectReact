import React, { useEffect, useState } from 'react';
import { IconImports, JsonImports, StyleImports } from './minor/imports';
import { Button, Table, Modal, Form, Input, Select } from 'antd';
import { getUsersAndRoles } from './minor/usersPanel/userPanelRequests';
import { connect } from "react-redux";
import { usersTableColumns } from './minor/usersPanel/usersTableColumns';
import { event } from 'jquery';

const UserPanel = (props) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const [state, setState] = useState({
        loading: true,
        users: [],
        roles: [],
        userEditMode: false,
        editedUser: {},
        userToEdit: {}
    });

    useEffect(() => {
        // TODO: cleanup
        let unMounted = false;
        //if (unMounted === false && props.isLoggedIn === true) {
            getUsersAndRoles((responses) => {
                const users = responses[0].data.map((row, index) => ({
                    key: index,
                    name: row.name,
                    userName: row.userName,
                    email: row.email,
                    role: row.role === null ? JsonImports.userPanelNoRole : row.role
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
        //}
        /*else return () => {
            unMounted = true;
        }*/
    }, []);

    const handleEditMode = (event) => {
        const node = parseInt(event.target.parentElement.parentElement.parentElement.dataset.rowKey);
        const user = state.users.filter(user => user.key === node);
        setState({
            ...state,
            userEditMode: true,
            userToEdit: user[0]
        });
    }

    const handleEditFinish = () => {
        setState({
            ...state, 
            userEditMode: false
        });
    }

    const handleEditCancel = () => {
        setState({
            ...state, 
            userEditMode: false
        });
    }

    const columns = usersTableColumns(state, handleEditMode, handleEditFinish);

    return(
        <>
            <StyleImports.LoadingSpin tip={JsonImports.loadingHint} indicator={IconImports.LoadingIcon} spinning={state.loading}/>
            <StyleImports.TableContainer>
                {
                    !state.loading ? 
                    <>
                        <StyleImports.PageTitle>{ JsonImports.userPanelTitle }</StyleImports.PageTitle>
                        <Table rowKey={record => record.key} columns={columns} dataSource={state.users}/>
                    </> : null
                }
                
            </StyleImports.TableContainer>
            <Modal
                title={JsonImports.userPanelModalTitle}
                visible={state.userEditMode}
                onOk={handleEditFinish}
                onCancel={handleEditCancel}
                okText={JsonImports.userPanelSaveEdit}
                cancelText={JsonImports.userPanelCancelEdit}
            >
                <Form 
                    layout="vertical" 
                    onFinish={handleEditFinish} 
                    form={form} 
                    initialValues={{
                        ["oldName"]: state.userToEdit.name,
                        ["oldEmail"]: state.userToEdit.email,
                        ["oldUserName"]: state.userToEdit.userName,
                        ["oldRole"]: state.userToEdit.role
                    }}
                >
                    <Form.Item name="oldName" label={JsonImports.userPanelOldName}>
                        <Input  disabled/>
                    </Form.Item>
                    <Form.Item name="newName" label={JsonImports.userPanelNewName}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="oldEmail" label={JsonImports.userPanelOldEmail}>
                        <Input  disabled/>
                    </Form.Item>
                    <Form.Item name="newEmail" label={JsonImports.userPanelNewEmail}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="oldUserName" label={JsonImports.userPanelOldUserName}>
                        <Input  disabled/>
                    </Form.Item>
                    <Form.Item name="newUserName" label={JsonImports.userPanelNewUserName}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="oldRole" label={JsonImports.userPanelOldRole}>
                        <Input  disabled/>
                    </Form.Item>
                    <Form.Item name="newRole" label={JsonImports.userPanelNewRole}>
                        <Select
                            showSearch
                            placeholder={JsonImports.userPanelPlacehold}
                        >
                            {  
                                state.roles.map(role => {
                                    return <Option key={role.name}>{role.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
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
