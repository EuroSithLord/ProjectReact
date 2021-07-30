import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import Login from './components/Login';
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom"
import { setCookies } from './redux/actions/appStartActions';
import Dashboard from './components/Dashboard';
import { Home } from './components/Home';
import Register from './components/Register';
import { PublicRoute, PrivateRoute } from "./components/RouterRoutes";
import { Switch } from 'react-router-dom';
import { StyleImports } from './components/minor/imports';
import Sidebar from './components/Sidebar';
import CreateRole from './components/CreateRole';
import DeleteRole from './components/DeleteRole';
import UserPanel from './components/UserPanel';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

// return to login

const App = (props) => {
  const history = useHistory();
  const { cookiesToState, isLoggedIn } = props;

  const [state, setState] = useState({
        collapsed: false
  });

  useEffect(() => {
    let unMounted = false;
    cookiesToState();
    if (isLoggedIn === "true" && unMounted === false) history.push("/");
    return () => {
      unMounted = true
    }
  }, [history, isLoggedIn, cookiesToState]);

  const onCollapse = (collapsed) =>{
    setState({
        collapsed
    });
  }

  return (
    <>
      <GlobalStyle />
      <StyleImports.DocumentContainer>
        <Sidebar onCollapse={onCollapse} collapsed={state.collapsed} isLoggedIn={isLoggedIn}/>
        <StyleImports.ContentContainer collapsed={state.collapsed} isLoggedIn={isLoggedIn}>
          <Switch>
              <Layout isLoggedIn={isLoggedIn}>
                <PrivateRoute isLoggedIn={isLoggedIn} restricted={false} exact path="/" component={Home}/>
                <PrivateRoute isLoggedIn={isLoggedIn} restricted={false} path="/dashboard" redirect="/" exact component={Dashboard}/>
                <PrivateRoute isLoggedIn={isLoggedIn} restricted={false} exact path="/admin/users" component={UserPanel}/>
                <PrivateRoute isLoggedIn={isLoggedIn} restricted={false} exact path="/admin/create-role" component={CreateRole}/>
                <PrivateRoute isLoggedIn={isLoggedIn} restricted={false} exact path="/admin/delete-role" component={DeleteRole}/>
                <PublicRoute isLoggedIn={isLoggedIn} exact path='/' component={Login}/>
                <PublicRoute isLoggedIn={isLoggedIn} path="/auth/register" component={Register} />
              </Layout>
          </Switch>
        </StyleImports.ContentContainer>
      </StyleImports.DocumentContainer>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    cookiesToState: () => dispatch(setCookies())
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
