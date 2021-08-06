import React from 'react';
import { Button } from 'antd';
import { JsonImports } from '../imports';

export const rolesTableColumns = (handleEditMode, handleRemoveRole) => {
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
                title: 'Acțiuni',
                key: 'tableActions',
                render: (props) => (
                    <>
                        <Button onClick={() => handleEditMode(props.key)} user={props.record} style={{margin: "5px 5px 5px 5px"}}>
                            { JsonImports.rolePanelEdit }
                        </Button>
                        <Button onClick={handleRemoveRole} user={props.record} style={{margin: "5px 5px 5px 5px"}} type="primary">
                            { JsonImports.rolePanelRemove }
                        </Button>
                    </>
                )
            }
        ]
    }

    /*
    StyleImports.InlineContainer>
                        <Button onClick={handleEditMode} user={props.record}>
                            { JsonImports.userPanelEdit }
                        </Button>
                        <Button onClick={handleRemoveUser} user={props.record} type="primary">
                            { JsonImports.userPanelRemove }
                        </Button>
                    </StyleImports.InlineContainer>*/