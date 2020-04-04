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
            const newMsgIndicator = this.props.msgCount ? `(${this.props.msgCount})` : '';

            navbar =
                <List component="nav">
                    <ListItem component="div">
                        <Link className="navbarLink" to='/student-profile'>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy variant="subtitle1">
                                    Your Profile
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="navbarLink" to='/inbox'>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy variant="subtitle1">
                                    Your Inbox{newMsgIndicator}
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="navbarLink" to={"/appointments"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy variant="subtitle1">
                                    Your Appointments
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="navbarLink" to={"/student-app-inv"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy variant="subtitle1">
                                    Your Applications
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="navbarLink" to={"/"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy variant="subtitle1">
                                    Search Teams
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="navbarLink" to={"/search-student"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy variant="subtitle1">
                                    Search Students
                                </TypoGraphy>
                            </ListItemText>
                        </Link>


                        <Link className="navbarLink" to={"/logout"}>
                            <ListItemText inset className="navbarText" >
                                <TypoGraphy variant="subtitle1">
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
                        <Link className="navbarLink" to={"/adminDashboard"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy variant="subtitle1">
                                    Admin Dashboard
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="navbarLink" to={"/"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy variant="subtitle1">
                                    Search Teams
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="navbarLink" to={"/search-student"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy variant="subtitle1">
                                    Search Students
                                </TypoGraphy>
                            </ListItemText>
                        </Link>


                        <Link className="navbarLink" to={"/logout"}>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy variant="subtitle1">
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
                        <Link className="navbarLink" to='/login'>
                            <ListItemText inset className="navbarText" >
                                <TypoGraphy variant="subtitle1">
                                     Login
                                </TypoGraphy>
                            </ListItemText>
                        </Link>

                        <Link className="navbarLink" to='/signup'>
                            <ListItemText inset  className="navbarText" >
                                <TypoGraphy variant="subtitle1">
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
