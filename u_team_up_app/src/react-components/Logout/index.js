import React from "react";
import { withRouter } from "react-router-dom";

import { request } from "../../actions/url";
import { SERVER_URL } from "../../config";

class Logout extends React.Component {
    componentDidMount() {
        const { token } = this.props.globalState.identity;

        request
            .post(`${SERVER_URL}auth/revoke`, { token, tokenToRevoke: token })
            .catch(() => {});

        this.props.logoutCallback();

        this.props.history.push("/");
    }

    render() {
        return [];
    }
}

export default withRouter(Logout);
