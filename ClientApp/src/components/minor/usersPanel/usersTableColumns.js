import React from 'react';
import { Select, Button } from 'antd';
import { JsonImports, StyleImports } from '../imports';

const { Option } = Select;

export const usersTableColumns = (state, handleEditMode, handleEditFinish) => {
        console.log("test");
        return  [
            {
                title: 'Nume',
                dataIndex: 'name',
                key: 'name',
                colspan: 1,
                rowspan: 0,
                /*filters: state.users.map(user => {
                    const nameParts = user.name.Split(" ");
                    name
                }),*/
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => a.name < b.name,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                colspan: 0,
                rowspan: 0,
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => a.email < b.email,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Nume utilizator',
                dataIndex: 'userName',
                key: 'userName',
                colspan: 0,
                rowspan: 0,
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => a.userName < b.userName,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Rol utilizator',
                dataIndex: 'role',
                key: 'role',
                colspan: 0,
                rowspan: 0,
                //render: () => (
                    /*<Select 
                        showSearch
                        placeholder={JsonImports.userPanelPlaceholder}
                        optionFilterProp="roles"
                        filterOption={(input, option) => option.roles.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        disabled={!state.userEditMode}
                    >
                        {
                            state.roles.map(role => {
                                return <Option key={role.name}>{role.name}</Option>
                            })
                        }
                    </Select>*/
                //)
            },
            {
                title: 'Acțiuni',
                key: 'tableActions',
                render: (props) => (
                    <Button onClick={handleEditMode} user={props.record}>
                        { JsonImports.userPanelEdit }
                    </Button>
                )
            }
        ]
    }