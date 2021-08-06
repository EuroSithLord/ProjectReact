import React from 'react';
import { Card } from 'antd';
import { JsonImports, StyleImports } from '../imports';
import { Typography } from 'antd';

const { Text } = Typography;

export const UserDetailsCard = (props) => {
    return(
        <Card bordered={false}>
            <StyleImports.CardGroup marginBottom={15}>
                <StyleImports.CustomTertiaryTitle marginBottom={10} fontSize={16} color="#001529">
                    { JsonImports.userPanelDetailsEmail }
                </StyleImports.CustomTertiaryTitle>
                <Text strong>{props.user.email}</Text>
            </StyleImports.CardGroup>
            <StyleImports.CardGroup marginBottom={15} marginTop={15}>
                <StyleImports.CustomTertiaryTitle marginBottom={10} fontSize={16} color="#001529">
                    { JsonImports.userPanelDetailsUsername }
                </StyleImports.CustomTertiaryTitle>
                <Text strong>{props.user.userName}</Text>
            </StyleImports.CardGroup>
            <StyleImports.CardGroup marginBottom={15} marginTop={15}>
                <StyleImports.CustomTertiaryTitle marginBottom={10} fontSize={16} color="#001529">
                    { JsonImports.userPanelDetailsRoles }
                </StyleImports.CustomTertiaryTitle>
                {
                    props.user.roles?.map(role => {return <Text key={role} strong>{role}</Text>})
                }
            </StyleImports.CardGroup>
        </Card>
    )
}