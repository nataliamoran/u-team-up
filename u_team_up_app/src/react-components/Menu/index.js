import React, { Component } from "react";
import { Menu, Message } from "semantic-ui-react";

export default class AppMenu extends Component {
  state = {};
  handleClick = () => this.setState({ message: "onClick handled" });

  render() {
    const { message } = this.state;

    return (
      <div>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"></link>
        <Menu>
          <Menu.Item href="/" target="_blank">
            Search Teams
          </Menu.Item>
          <Menu.Item href="/search-student" target="_blank">
            Search Students
          </Menu.Item>
          <Menu.Item href="/appointments" target="_blank">
            Your Appointments
          </Menu.Item>
        </Menu>

        {message && <Message content={message} />}
      </div>
    );
  }
}

