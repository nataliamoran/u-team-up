import React from 'react';
import { withRouter } from "react-router-dom";


class Logout extends React.Component {
    componentDidMount() {
        this.props.loginCallback({ username: '', uid: '', type: 'guest', token: '' });

        this.props.history.push('/');
    }

    render() {
        return [];
    }
};

export default withRouter(Logout);
