import React, { Component } from "react";
import { Menu, Message } from "semantic-ui-react";

<<<<<<< HEAD
export default class AppMenu extends Component {
  state = {};
  handleClick = () => this.setState({ message: "onClick handled" });
=======
export default function AppMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
>>>>>>> 77715c19a80dc4f286223687a7d32be7ee7e7470

  render() {
    const { message } = this.state;

    return (
<<<<<<< HEAD
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
=======
            <div className="main_menu">
                <Button className="main_menu_button" aria-controls="simple-menu" aria-haspopup="true"
                        onClick={handleClick}>
                    menu
                </Button>
                <Menu
                    className="main_menu_content"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {
                        props.loginStatus === 'guest' ?
                            [<Link to='/login'>
                                <MenuItem>Log in</MenuItem>
                             </Link>,
                             <Link to='/signup'>
                                 <MenuItem>Sign up</MenuItem>
                             </Link>
                            ] :
                            [<Link to={"/"}>
                                 <MenuItem>search teams</MenuItem>
                             </Link>,
                             <Link to={"/search-student"}>
                                 <MenuItem>search students</MenuItem>
                             </Link>,
                             <Link to={"/appointments"}>
                                 <MenuItem>your appointments</MenuItem>
                             </Link>,
                             <Link to='/logout'>
                                 <MenuItem>Log out</MenuItem>
                             </Link>,
                            ]
                    }
                </Menu>
            </div>
>>>>>>> 77715c19a80dc4f286223687a7d32be7ee7e7470
    );
  }
}

