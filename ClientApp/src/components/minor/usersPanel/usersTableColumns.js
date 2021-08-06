import React from 'react';
import { Button } from 'antd';
import { JsonImports } from '../imports';

export const usersTableColumns = (handleEditMode, handleRemoveUser, handleDetailsMode) => {
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
                title: 'Acțiuni',
                key: 'tableActions',
                render: (props) => (
                    <>
                        <Button onClick={() => {handleDetailsMode(props.key)}} user={props.record} style={{margin: "5px 5px 5px 5px"}}>
                            { JsonImports.userPanelDetails }
                        </Button>
                        <Button onClick={() => {handleEditMode(props.key)}} user={props.record} style={{margin: "5px 5px 5px 5px"}}>
                            { JsonImports.userPanelEdit }
                        </Button>
                        <Button onClick={() => {handleRemoveUser(props.key)}} user={props.record} style={{margin: "5px 5px 5px 5px"}} type="primary">
                            { JsonImports.userPanelRemove }
                        </Button>
                    </>
                )
            }
        ]
    }