import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { JsonImports } from '../imports';

const { Option } = Select;

export const ModalEditForm = (props) => {
    const [form] = Form.useForm();

    const handleReset = () => {
        form.resetFields();
    }

    return (
        <Form 
            layout="vertical" 
            onFinish={props.handleEditFinish} 
            form={form} 
            name="editUserForm"
        >
            <Form.Item name="firstName" label={JsonImports.userPanelNewFName}>
                <Input />
            </Form.Item>
            <Form.Item name="lastName" label={JsonImports.userPanelNewLName}>
                <Input />
            </Form.Item>
            <Form.Item  name="email" label={JsonImports.userPanelNewEmail}>
                <Input />
            </Form.Item>
            <Form.Item name="userName" label={JsonImports.userPanelNewUserName}>
                <Input />
            </Form.Item>
            <Form.Item name="roles" label={JsonImports.userPanelNewRole}>
                <Select
                    showSearch
                    mode="multiple"
                    placeholder={JsonImports.userPanelPlacehold}
                >
                    {  
                        props.roles.map(role => {
                            return <Option key={role.name}>{role.name}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <Button type="primary" htmlType="submit">
                        { JsonImports.userPanelSaveEdit }
                    </Button>
                    <Button htmlType="button" onClick={props.handleEditCancel}>
                        { JsonImports.userPanelCancelEdit }
                    </Button>
                    <Button htmlType="button" onClick={handleReset}>
                        { JsonImports.userPanelResetEdit }
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}

export const ModalCreateForm = (props) => {
    const [form] = Form.useForm();

    const handleReset = () => {
        form.resetFields();
    }

    return (
        <Form 
            layout="vertical" 
            onFinish={props.handleCreateFinish} 
            form={form} 
            name="createUserForm"
        >
            <Form.Item name="firstName" label={JsonImports.userPanelCreateFName}>
                <Input />
            </Form.Item>
            <Form.Item name="lastName" label={JsonImports.userPanelCreateLName}>
                <Input />
            </Form.Item>
            <Form.Item  name="email" label={JsonImports.userPanelCreateEmail}>
                <Input />
            </Form.Item>
            <Form.Item  name="password" label={JsonImports.userPanelCreatePassword}>
                <Input type="password" />
            </Form.Item>
            <Form.Item name="role" label={JsonImports.userPanelCreateRole}>
                <Select
                    showSearch
                    mode="multiple"
                    placeholder={JsonImports.userPanelPlacehold}
                >
                    {  
                        props.roles.map(role => {
                            return <Option key={role.name}>{role.name}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <Button type="primary" htmlType="submit">
                        { JsonImports.userPanelCreateSubmit }
                    </Button>
                    <Button htmlType="button" onClick={props.handleCreateCancel}>
                        { JsonImports.userPanelCreateCancel }
                    </Button>
                    <Button htmlType="button" onClick={handleReset}>
                        { JsonImports.createRoleReset }
                    </Button>
                </div>
            </Form.Item>
        </Form>
    )
}