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
                initialValues={{
                    "oldName": props.roleToEdit.name,
                }}
            >
                <Form.Item name="oldName" label={JsonImports.editRoleOldName}>
                    <Input disabled/>
                </Form.Item>
                <Form.Item name="newName" label={JsonImports.editRoleNewName}>
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <Button type="primary" htmlType="submit">
                            { JsonImports.rolePanelSaveEdit }
                        </Button>
                        <Button htmlType="button" onClick={props.handleEditCancel}>
                            { JsonImports.rolePanelEditCancel }
                        </Button>
                        <Button htmlType="button" onClick={handleReset}>
                            { JsonImports.rolePanelResetEdit }
                        </Button>
                    </div>
                </Form.Item>
            </Form>
    );
}
