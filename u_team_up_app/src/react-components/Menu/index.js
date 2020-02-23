import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

export default function AppMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
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
                    <Link to={"/"}>
                        <MenuItem>search teams</MenuItem>
                    </Link>
                    <Link to={"/search-student"}>
                        <MenuItem>search students</MenuItem>
                    </Link>
                    <MenuItem onClick={handleClose}>logout</MenuItem>
                </Menu>
            </div>
    );
}
