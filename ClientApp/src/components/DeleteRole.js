import React, { useState } from 'react';
import { Form, Input, Button } from 'antd'
import { JsonImports, StyleImports } from './minor/imports';
import { deleteRoleRequest } from './minor/roleRequest';

const DeleteRole = () => {
    const [state, setState] = useState({
        name: "",
    });

    const [form] = Form.useForm();

    const handleFinish = () => {
        deleteRoleRequest(state, (response) => {
            StyleImports.Notification["success"]({
                message: JsonImports.deleteRoleSuccess,
                description: response.data
            })
        }, 
        (exception) => {
            StyleImports.Notification["error"]({
                message: JsonImports.deleteRoleFail,
                description: exception.response.data
            })
        });
    }

    const handleChange = (event) => {
        setState({
            ...state,
            name: event.target.value
        });
    };

    const handleReset = () => {
        form.resetFields();
    };

    return(
        <StyleImports.FormContainer>
            <StyleImports.PageTitle>{ JsonImports.deleteRoleTitle }</StyleImports.PageTitle>
            <Form layout="vertical" form={form} onFinish={handleFinish}>
                <Form.Item name="name" label={JsonImports.deleteRoleLabel} rules={[{required: true}]}>
                    <Input onChange={handleChange} placeholder={JsonImports.deleteRolePlaceholder}/>
                </Form.Item>
                <Form.Item>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <Button type="primary" htmlType="submit" >
                            { JsonImports.deleteRoleSubmit }
                        </Button>
                        <Button htmlType="button" onClick={handleReset}>
                            { JsonImports.deleteRoleReset }
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </StyleImports.FormContainer>
    );
}

export default DeleteRole;
