import React, {  useEffect } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Login from './components/Login';
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom"
import { setCookies } from './redux/actions/appStartActions';
import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';
import Register from './components/Register';

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

const App = (props) => 
{ 
  const history = useHistory();

  
  const {cookiesToState, isLoggedIn} = props;

  useEffect(() => {
    let unMounted = false;
    cookiesToState();
    if (isLoggedIn === "true" && unMounted === false) history.push("/");
    return () => {
      unMounted = true
    }
  }, [history, isLoggedIn, cookiesToState]);

  return (
    <>
      <GlobalStyle/>
      {
        props.isLoggedIn === "true" ? 
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Layout> :
        <>  
          <Route exact path='/' component={Login} />
          <Route path="/auth/register" component={Register} />
        </>
      }
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
