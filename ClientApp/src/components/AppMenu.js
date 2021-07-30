import React, { useState } from "react";
import { Menu } from "antd";
import { JsonImports } from "./minor/imports";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import { setCookies } from '../redux/actions/appStartActions';
import Cookies from 'js-cookie';
import { logOutAction } from '../redux/actions/authActions';
import { NavLink } from "react-router-dom";

const { Submenu } = Menu;

const AppMenu = (props) => {
    const [state, setState] = useState({
        current: 'mail'
    });
    const { current } = state;
    const { fullName, isLoggedIn, logOut } = props;

    const handleLogOut = () => {
        Cookies.remove('user', { path: '/' });
        logOut();
    }

    const handleClick = (event) => {
        console.log('click ', event);
        setState({ current: event.key });
    }

    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="appTitle">
                <NavLink to="/">
                    { JsonImports.appTitle }
                </NavLink>
            </Menu.Item>
            <div>
                <Menu.Item icon={HomeOutlined} key="home">
                    <NavLink to="/">
                        { JsonImports.homeButton }
                    </NavLink>
                </Menu.Item>
                <Submenu icon={UserOutlined} title={isLoggedIn === "true" ? fullName : JsonImports.authButton}>
                    {isLoggedIn === "true" ?
                        <>  
                        <Menu.Item key="dashboard">
                            <NavLink to="/dashboard">
                                { JsonImports.dashboardButton }
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="dashboard" onClick={handleLogOut}>
                            { JsonImports.logOut }
                        </Menu.Item>

                        </> : null
                    }
                </Submenu>
            </div> 
        </Menu>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    cookiesToState: (userName, fullName, isLoggedIn) => dispatch(setCookies(userName, fullName, isLoggedIn)),
    logOut: () => dispatch(logOutAction())
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    fullName: state.fullName,
    userName: state.userName
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu)
