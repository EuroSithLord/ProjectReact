import React from 'react';
import { Form, Input, Button } from 'antd'
import { JsonImports } from '../imports';

export const EditRole = (props) => {
    const [form] = Form.useForm();

    const handleReset = () => {
        form.resetFields();
    };

    return(
            <Form 
                layout="vertical" 
                form={form} 
                onFinish={props.handleEditFinish}
            >
                <Form.Item name="name" label={JsonImports.editRoleNewName}>
                    <Input allowClear/>
                </Form.Item>
                <Form.Item>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <Button type="primary" htmlType="submit">
                            { JsonImports.rolePanelSaveEdit }
                        </Button>
                        <Button htmlType="button" onClick={props.handleEditCancel}>
                            { JsonImports.rolePanelEditCancel }
                        </Button>
                    </div>
                </Form.Item>
            </Form>
    );
}
