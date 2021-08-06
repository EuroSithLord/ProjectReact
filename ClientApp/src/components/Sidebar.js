import React from "react";
import { Menu, Layout } from "antd";
import { IconImports } from "./minor/imports";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { JsonImports } from "./minor/imports";

const { Sider } = Layout;

const Sidebar = (props) => {
    const { fullName, isLoggedIn } = props;

    return(
        <>
            {
                isLoggedIn ?
                <Sider collapsible collapsed={props.collapsed} onCollapse={props.onCollapse}>
                    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                        <Menu.Item key='1' icon={<IconImports.UserIcon/>}>
                            <NavLink to="/dashboard">{ fullName }</NavLink>
                        </Menu.Item>
                        <Menu.Item key='2' icon={<IconImports.ControlIcon/>}>
                            <NavLink to='/admin/users'>
                                { JsonImports.usersPanel }
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key='3' icon={<IconImports.ControlIcon/>}>
                            <NavLink to='/admin/roles'>
                                { JsonImports.rolesPanel }
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key='4' icon={<IconImports.MailIcon/>}>
                            { JsonImports.userInbox }
                        </Menu.Item>
                    </Menu>
                </Sider> : null
            }
        </>
    )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    fullName: state.fullName,
  }
}

export default connect(mapStateToProps)(Sidebar)
