import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { JsonImports } from '../imports';

const { Option } = Select;

export const ModalEditForm = (props) => {
    const [form] = Form.useForm();

    return (
        <Form 
            layout="vertical" 
            onFinish={props.handleEditFinish} 
            form={form} 
            name="editUserForm"
        >
            <Form.Item name="firstName" label={JsonImports.userPanelNewFName}>
                <Input allowClear/>
            </Form.Item>
            <Form.Item name="lastName" label={JsonImports.userPanelNewLName}>
                <Input allowClear/>
            </Form.Item>
            <Form.Item  name="email" label={JsonImports.userPanelNewEmail}>
                <Input allowClear/>
            </Form.Item>
            <Form.Item name="userName" label={JsonImports.userPanelNewUserName}>
                <Input allowClear/>
            </Form.Item>
            <Form.Item name="roles" label={JsonImports.userPanelNewRole}>
                <Select
                    allowClear
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
                </div>
            </Form.Item>
        </Form>
    )
}

export const ModalCreateForm = (props) => {
    const [form] = Form.useForm();

    return (
        <Form 
            layout="vertical" 
            onFinish={props.handleCreateFinish} 
            form={form} 
            name="createUserForm"
        >
            <Form.Item 
                name="firstName" 
                label={JsonImports.userPanelCreateFName}
                rules={[
                    {
                        required: true,
                        message: JsonImports.userPanelCreateMissingFName
                    }
                ]}
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item 
                name="lastName" 
                label={JsonImports.userPanelCreateLName}
                rules={[
                    {
                        required: true,
                        message: JsonImports.userPanelCreateMissingLName
                    }
                ]}
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item  
                name="email" 
                label={JsonImports.userPanelCreateEmail}
                rules={[
                    {
                        required: true,
                        message: JsonImports.userPanelCreateMissingEmail
                    }
                ]}    
            >
                <Input allowClear/>
            </Form.Item>
            <Form.Item  
                name="password" 
                label={JsonImports.userPanelCreatePassword}
                rules={[
                    {
                        required: true,
                        message: JsonImports.userPanelCreateMissingPassword
                    }
                ]}
            >
                <Input.Password allowClear />
            </Form.Item>
            <Form.Item 
                name="role" 
                label={JsonImports.userPanelCreateRole}
                rules={[
                    {
                        required: true,
                        message: JsonImports.userPanelCreateMissingRoles
                    }
                ]}
            >
                <Select 
                    allowClear
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
                </div>
            </Form.Item>
        </Form>
    )
}