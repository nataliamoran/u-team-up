import React from "react";

import Header from "../Header";
import NavBar from "../NavBar";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import "./styles.css";

import { request } from "../../actions/url";
import { SERVER_URL } from "../../config";

class Navigator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msgCount: null,
            lastHistoryLocation: props.history.location
        };

        this.back = this.back.bind(this);
    }

    isUser() {
        return this.props.globalState.identity.type === "user";
    }

    // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data
    static getDerivedStateFromProps(props, state) {
        if (props.history.location !== state.lastHistoryLocation) {
            // clicked a link
            return {
                msgCount: null,
                lastHistoryLocation: props.history.location
            };
        }
        return null;
    }

    componentDidMount() {
        this.checkLoginStatus();
        this.getMessageCount();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.msgCount === null) {
            this.checkLoginStatus();
            this.getMessageCount();
        }
    }

    async checkLoginStatus() {
        if (this.props.globalState.identity.type !== "guest") {
            try {
                await request.get(`${SERVER_URL}auth/check`, {
                    token: this.props.globalState.identity.token
                });
            } catch (_) {
                this.props.logoutCallback();
            }
        }
    }

    async getMessageCount() {
        if (!this.isUser()) {
            return;
        }
        const { count } = await request.get(
            `${SERVER_URL}api/user/messages/count`,
            { token: this.props.globalState.identity.token }
        );
        this.setState({ msgCount: count });
    }

    back() {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="navigator">
                <div className="navigator__header_line">
                    <div className="navigator__header_left">
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={this.back}
                        >
                            {"<<"}
                        </Button>
                    </div>

                    <Header
                        type="main"
                        title={
                            <Link className="navbar_title_Link" to="/">
                                UTeamUp!
                            </Link>
                        }
                        className="navigator__header_title"
                    >
                        <NavBar
                            loginStatus={this.props.globalState.loginStatus}
                            identity={this.props.globalState.identity}
                            msgCount={this.state.msgCount}
                        />
                    </Header>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(Navigator);
