import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import "./styles.css";

const StyledMenu = withStyles({
  paper: {
    color: 'black',
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    backgroundColor="rgb(30, 144, 255)"
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: "rgb(30, 144, 255)",
      '& .MuiListItemIcon-root': {
        color: theme.palette.common.white,
      },
      '& .MuiListItemText-primary': {
        color: theme.palette.common.white,
        font: 'bold'
      },
    },
  },
}))(MenuItem);

export default function AppMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    var links =
                    [
                     <Link className="link" to='/login'>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText className="menuText" primary="Login" />
                        </StyledMenuItem>
                     </Link>,
                     <Link className="link" to='/signup'>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText className="menuText" primary="Sign Up" />
                        </StyledMenuItem>
                     </Link>
                    ]

    if (props.loginStatus === 'user') {
        var links =
                    [<Link className="link" to='/student-profile'>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText className="menuText" primary="Your Profile" />
                        </StyledMenuItem>
                     </Link>,
                     <Link className="link" to='/inbox'>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText className="menuText" primary="Your Inbox" />
                        </StyledMenuItem>
                     </Link>,
                     <Link className="link" to={"/"}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText className="menuText" primary="Search Teams" />
                        </StyledMenuItem>
                     </Link>,
                     <Link className="link" to={"/search-student"}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText className="menuText" primary="Search Students" />
                        </StyledMenuItem>
                     </Link>,
                     <Link className="link" to={"/appointments"}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText className="menuText" primary="Your Appointments" />
                        </StyledMenuItem>
                     </Link>,
                     <Link className="link" to='/logout'>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText className="menuText" primary="Logout" />
                        </StyledMenuItem>
                     </Link>,
                    ]
    }

    if (props.loginStatus === 'admin') {
        var links =
                    [<Link className="link" to={"/adminDashboard"}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText className="menuText" primary="Admin Dashboard" />
                        </StyledMenuItem>
                     </Link>,
                     <Link className="link" to={"/"}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText className="menuText" primary="Search Teams" />
                        </StyledMenuItem>
                     </Link>,
                     <Link className="link" to={"/search-student"}>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText className="menuText" primary="Search Students" />
                        </StyledMenuItem>
                     </Link>,
                     <Link className="link" to='/logout'>
                        <StyledMenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                        <ListItemText className="menuText" primary="Logout" />
                        </StyledMenuItem>
                     </Link>
                    ]
    }
     /*else {
        const links =
                    [
                     <Link to='/login'>
                         <MenuItem>Log in</MenuItem>
                     </Link>,
                     <Link to='/signup'>
                         <MenuItem>Sign up</MenuItem>
                     </Link>
                    ]
    }*/

    return (
            /*<div className="main_menu">
                <Button className="main_menu_button" aria-controls="simple-menu" aria-haspopup="true"
                        onClick={handleClick}>
                    menu
                </Button>
                <Menu
                    id=""
                    className="main_menu_content"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {links}
                </Menu>
            </div>*/
            <div>
                <Button className="button"
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    background-color="rgb(30, 144, 255)"
                    onClick={handleClick}
                >
                    Open Menu
                </Button>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    color="rgb(30, 144, 255)"
                >
                    {links}
                </StyledMenu>
            </div>
    );
}
