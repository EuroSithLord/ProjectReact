import React, { useState } from 'react';
import { Form, Input, Button } from 'antd'
import { JsonImports, StyleImports } from './minor/imports';
import { createRoleRequest } from './minor/roleRequest';

const CreateRole = () => {
    const [state, setState] = useState({
        name: "",
    });

    const [form] = Form.useForm();

    const handleFinish = () => {
        createRoleRequest(state, (response) => {
            StyleImports.Notification["success"]({
                message: JsonImports.createRoleSuccess,
                description: response.data
            })
        }, 
        (exception) => {
            StyleImports.Notification["error"]({
                message: JsonImports.createRoleFail,
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
            <StyleImports.PageTitle>{ JsonImports.createRoleTitle }</StyleImports.PageTitle>
            <Form layout="vertical" form={form} onFinish={handleFinish}>
                <Form.Item name="name" label={JsonImports.createRoleLabel} rules={[{required: true}]}>
                    <Input onChange={handleChange} placeholder={JsonImports.createRolePlaceholder}/>
                </Form.Item>
                <Form.Item>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <Button type="primary" htmlType="submit" >
                            { JsonImports.createRoleSubmit }
                        </Button>
                        <Button htmlType="button" onClick={handleReset}>
                            { JsonImports.createRoleReset }
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </StyleImports.FormContainer>
    );
}

export default CreateRole;
