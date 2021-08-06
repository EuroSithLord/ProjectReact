import styled from "styled-components";
import { Container } from 'reactstrap';
import { Alert } from "antd";

export const DocumentContainer = styled.div`
    width: 100%;
    display: flex;
    min-height: 100vh;
`

export const ContentContainer = styled.div`
    width: calc(100% - ${props => props.isLoggedIn ? props.collapsed ? "80px" : "200px" : "0px"});
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`

export const FormContainer = styled.div`
    width: 100%;
    max-width: 400px;
    margin: auto;
    padding: 100px 0px 100px 0px;
`

export const PageTitle = styled.h1`
    color: #001529;
    text-align: center;
    font-family: "Verdana, san-serif";
`

export const LayoutInnerContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TableContainer = styled.div`
    width: 100%;
    max-width: calc(100% - 20px);
    margin: auto;
    padding: 100px 0px 100px 0px;
`

export const GlobalFormAlert = styled(Alert)`
    margin-top: 0px;
    margin-bottom: 20px;
`

export const CardGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: ${props => props.marginTop}px;
    margin-bottom: ${props => props.marginBottom}px;
`

export const CustomTertiaryTitle = styled.h3`
    color: ${props => props.color};
    margin-top: ${props => props.marginTop}px;
    margin-bottom: ${props => props.marginBottom}px;
    font-size: ${props => props.fontSize}px;
`

export const CustomSecondTitle = styled.h2`
    color: ${props => props.color};
    margin-top: ${props => props.marginTop}px;
    margin-bottom: ${props => props.marginBottom}px;
    font-size: ${props => props.fontSize}px;
`

export const CustomPrimaryTitle = styled.h1`
    color: ${props => props.color};
    margin-top: ${props => props.marginTop}px;
    margin-bottom: ${props => props.marginBottom}px;
    font-size: ${props => props.fontSize}px;
`
