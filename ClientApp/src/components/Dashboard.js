import { PageContainer, InnerPageContainer } from "./minor/dashboard/dashboardStyles"
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Dashboard = (props) => {
    const history = useHistory();
    const { isLoggedIn } = props;

    useEffect(() => {
        if (!isLoggedIn) {
            history.push("/");
            console.log(20);
        }
    });

    return(
        <PageContainer>
            <InnerPageContainer>
                
            </InnerPageContainer>
        </PageContainer>
    )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  }
}

export default connect(mapStateToProps)(Dashboard)