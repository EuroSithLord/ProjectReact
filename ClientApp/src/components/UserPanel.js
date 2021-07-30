import React, { useEffect, useState } from 'react';
import { IconImports, JsonImports, StyleImports } from './minor/imports';
import { Button, Table, Select } from 'antd';
import { getUserList } from './minor/userPanelRequests';
import { getRoleListRequest } from './minor/roleRequest';

const getRoles = (func) => {};

const UserPanel = (props) => {
    const get = () => {
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
                render: roles => (
                    <Select 
                        showSearch
                        placeholder={JsonImports.userPanelPlaceholder}
                        optionFilterProp="roles"
                        filterOption={(input, option) => option.roles.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    </Select>
                )
            }
        ]
    }

    const columns = get();
    const [state, setState] = useState({
        loading: true,
        users: [],
        roles: []
    });

    useEffect(() => {
        // TODO: cleanup
        // TODO: two request same time 
        getUserList((response) => {
            const users = response.data.map((row, index) => ({
                key: index,
                name: row.name,
                userName: row.userName,
                email: row.email,
                role: row.role
            }));
            setState({
                ...state,
                loading: false,
                users: users
            });
        });
        
    }, []);

    return(
        <>
            <StyleImports.LoadingSpin tip={JsonImports.loadingHint} indicator={IconImports.LoadingIcon} spinning={state.loading}/>
            <StyleImports.TableContainer>
                {
                    !state.loading ? 
                    <Table columns={columns} dataSource={state.users}/> : null
                }
                {
                    !state.loading ?
                    <StyleImports.InlineContainer>
                        <Button type="primary">
                            { JsonImports.userPanelSubmit }
                        </Button>
                    </StyleImports.InlineContainer> :
                    null
                }
            </StyleImports.TableContainer>
        </>
    );
}

export default UserPanel;
