import styled from "styled-components";

export const PageContainer = styled.div`
    width: 100%;
    padding: 0px 0px 0px 0px;
    background-color: #ffffff;
`

export const InnerPageContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 50px 0px 50px 0px;
`

export const InformationContainer = styled.div`
    width: 100%;
    background: #edf1f4;
    display: grid;
    grid-row-gap: 30px;
    grid-template-rows: repeat(2,minmax(0,1fr));
    align-items: start;
    rows: 2;
`

export const InformationContainerRow = styled.div`
    display: grid;
    column-gap: 30px;
    grid-template-columns: minmax(0,1fr);
`

export const InformationCellOuter = styled.div`
    padding: 20px 20px 20px 20px;
    background: #ffffff;
    width: 100%;
    max-width: 300px;
`

export const InformationCell = styled.div`
    width: 100%;
    font-family: "Verdana, sans-serif";
    color: #282828;
`

export const CellTitle = styled.h1`
    text-align: center;
    margin: 10px 0px 10px 0px;
`
