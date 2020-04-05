import React from "react";

import Header from "../Header";
import "./styles.css";
import { SERVER_URL } from '../../config';
import { request } from '../../actions/url';
const debug = console.log;

class MessageBox extends React.Component {
    // @param props: {globalState: object}
    constructor(props) {
        super(props);

        this.state = {
            inbox: [],
        };

        this.markRead = this.markRead.bind(this);
    }

    componentDidMount() {
        const authorized = this.props.globalState.loginStatus === "user";
        authorized && this.fetchMessages();
    }

    async fetchMessages() {
        const r = await request.get(`${SERVER_URL}api/user/messages`,
                                    { token: this.props.globalState.identity.token });
        debug(r);
        const result = r.result;
        this.setState({ inbox: result.reverse() });
    }

    async markRead(id) {
        await request.post(`${SERVER_URL}api/user/message/read`,
                          { token: this.props.globalState.identity.token, id, read: true });
        return this.fetchMessages();
    }

    render() {
        const authorized = this.props.globalState.loginStatus === "user";

        const generateMessageView = msg => (
            <div
                key={msg._id}
                className={
                    "message_box__message" +
                    (msg.read ? "" : " message_box_message_unread")
                }
                onMouseUp={() => this.markRead(msg._id)}
            >
                <Header
                    type="secondary"
                    title={`${msg.read ? "" : "[*] "}Message from "${msg.teamCourse || "Deleted Team"}":`} />
                <div className="message_box__message_content">
                    {msg.messageText}
                    {msg.event && `${msg.event.name} 
                    from ${new Date(msg.event.start).toLocaleString()} 
                    to ${new Date(msg.event.end).toLocaleString()}`}
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
