import React from "react";

import Header from "../Header";
import "./styles.css";
import { SERVER_URL } from '../../config';
import { request } from '../../actions/url';

class MessageBox extends React.Component {
    // @param props: {globalState: object}
    constructor(props) {
        super(props);

        this.state = {
            inbox: [],
        };
    }

    componentDidMount() {
        const authorized = this.props.globalState.loginStatus === "user";
        authorized && this.fetchMessages();
    }

    async fetchMessages() {
        const { username } = this.props.globalState;
        const { result } = await request.get(`${SERVER_URL}api/user/messages`, { username });
        this.setState({ inbox: result });
    }

    render() {
        // TODO: FETCH
        const authorized = this.props.globalState.loginStatus === "user";

        const generateMessageView = msg => (
            <div
                key={msg._id}
                className={
                    "message_box__message" +
                    (msg.read ? "" : " message_box_message_unread")
                }>
                <Header
                    type="secondary"
                    title={`${msg.read ? "" : "[*] "}Message from "${msg.teamCourse}":`} />
                <div className="message_box__message_content">
                    {msg.messageText}
                    {msg.event && JSON.stringify(msg.event) /* FIXME */}
                </div>
            </div>
        );

        return (
            <div className="message_box">
                <Header
                    className="message_box__header"
                    type="main"
                    title="Your messages"
                />
                <div className="message_box__body">
                    {authorized
                        ? this.state.inbox.map(generateMessageView)
                        : "You are not allowed to visit this page. Please log in or sign up."}
                </div>
            </div>
        );
    }
}

export default MessageBox;
