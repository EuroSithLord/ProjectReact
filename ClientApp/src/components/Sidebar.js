import React from "react";
import { Menu, Layout } from "antd";
import { IconImports } from "./minor/imports";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { JsonImports } from "./minor/imports";

const { Sider } = Layout;
const { Submenu } = Menu;

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
                        <Menu.Item key='3' icon={<IconImports.UserAddIcon/>}>
                            <NavLink to='/admin/create-role'>
                                { JsonImports.addRole }
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key='4' icon={<IconImports.UserDeleteIcon/>}>
                            <NavLink to='/admin/delete-role'>
                                { JsonImports.deleteRole }
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key='5' icon={<IconImports.MailIcon/>}>
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
