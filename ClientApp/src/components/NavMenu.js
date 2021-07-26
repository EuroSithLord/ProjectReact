import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCookies } from '../redux/actions/appStartActions';
import Cookies from 'js-cookie';
import { logOutAction } from '../redux/actions/authActions';
import { logoutButtonTitle,  navbarAppTitle, navbarHomeButton} from '../json/appFeedback.json';

class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      dropdownOpen: false
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleLogOut = () => {
    Cookies.remove('user', {path: '/'});
    this.props.logOut();
  }

  render () {
    const toggle = () => {
      if (this.state.dropdownOpen === false) this.setState({...this.state, dropdownOpen: true});
      else this.setState({...this.state, dropdownOpen: false});
    }
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">{navbarAppTitle}</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">{navbarHomeButton}</NavLink>
                </NavItem>
                <Dropdown nav isOpen={this.state.dropdownOpen} toggle={toggle}>
                  <DropdownToggle nav caret className="text-dark">
                    {this.props.isLoggedIn === "true"? this.props.fullName : "Login"}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem><NavLink tag={Link} className="text-dark" to={this.props.isLoggedIn === "true" ? "/dashboard" : "/"}>
                      {this.props.isLoggedIn === "true"? this.props.fullName : "Login"}</NavLink>
                    </DropdownItem>
                    <DropdownItem onClick={this.handleLogOut}>{logoutButtonTitle}</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)
