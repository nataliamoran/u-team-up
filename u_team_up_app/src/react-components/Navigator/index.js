import React from "react";

import Header from "../Header";
import NavBar from "../NavBar";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button/Button";
import "./styles.css";

class Navigator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.back = this.back.bind(this);
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
                        title={<Link className="navbar_title_Link" to="/">UTeamUp!</Link>}
                        className="navigator__header_title"
                    >
                        <NavBar
                            loginStatus={this.props.globalState.loginStatus}
                            identity={this.props.globalState.identity}
                        />
                    </Header>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(Navigator);
