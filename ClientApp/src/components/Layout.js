import React, { Component } from 'react';
import { StyleImports } from './minor/imports';
import NavMenu from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;
  
  render () {
    return (
      <>
          {
            this.props.isLoggedIn ? 
            <>
              <NavMenu />
              <StyleImports.ContainerInnerContainer>
                {this.props.children}
              </StyleImports.ContainerInnerContainer> 
            </>
            : <StyleImports.ContainerInnerContainer>
              {this.props.children}
            </StyleImports.ContainerInnerContainer> 
          }
      </>
    );
  }
}
