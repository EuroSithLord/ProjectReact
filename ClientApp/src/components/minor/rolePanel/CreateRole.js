import React from 'react';
import { Form, Input, Button } from 'antd'
import { JsonImports } from '../imports';

export const CreateRole = (props) => {
    const [form] = Form.useForm();

    const handleReset = () => {
        form.resetFields();
    };

    return(
        <Form 
            layout="vertical" 
            form={form} 
            onFinish={props.handleCreateFinish}
        >
            <Form.Item name="name" label={JsonImports.createRoleLabel}>
                <Input />
            </Form.Item>
            <Form.Item>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <Button type="primary" htmlType="submit">
                        { JsonImports.rolePanelSaveCreate }
                    </Button>
                    <Button htmlType="button" onClick={props.handleCreateCancel}>
                        { JsonImports.rolePanelCreateCancel }
                    </Button>
                    <Button htmlType="button" onClick={handleReset}>
                        { JsonImports.rolePanelResetCreate }
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
}
