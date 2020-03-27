import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TypoGraphy from '@material-ui/core/Typography'
import {Link} from "react-router-dom";


class NavBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginStatus: props.loginStatus,
        };
    }


    render() {

        let navbar;

        if (this.props.loginStatus === 'user') {
            navbar =
                <List component="nav">
                    <ListItem component="div">
                        <Link className="link" to='/student-profile'>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy>
                                    Your Profile
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="link" to='/inbox'>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy>
                                    Your Inbox
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="link" to={"/appointments"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy>
                                    Your Appointments
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="link" to={"/"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy>
                                    Search Teams
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="link" to={"/search-student"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy>
                                    Search Students
                                </TypoGraphy>
                            </ListItemText>
                        </Link>


                        <Link className="link" to={"/logout"}>
                            <ListItemText inset className="navbarText" >
                                <TypoGraphy>
                                    Logout
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                    </ListItem>

                </List>

        } else if (this.props.loginStatus === 'admin') {
            navbar =
                <List component="nav">
                    <ListItem component="div">
                        <Link className="link" to={"/adminDashboard"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy>
                                    Admin Dashboard
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="link" to={"/"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy>
                                    Search Teams
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="link" to={"/search-student"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy>
                                    Search Students
                                </TypoGraphy>
                            </ListItemText>
                        </Link>


                        <Link className="link" to={"/logout"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy>
                                    Logout
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                    </ListItem>

                </List>
        } else {
            navbar =
                <List component="nav">
                    <ListItem component="div">
                        <Link className="link" to='/login'>
                            <ListItemText inset className="navbarText" >
                                <TypoGraphy>
                                     Login
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="link" to='/signup'>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy>
                                    Sign Up
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                    </ListItem>

                </List>
        }

        return (
            <div>
                {console.log("rendering navbar")}
                {console.log(this.props.loginStatus)}
                {navbar}
            </div>
        );
    }
}


export default NavBar;
