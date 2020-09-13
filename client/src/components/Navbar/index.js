import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from "react-router-dom";
import UserContext from "../../utils/userContext";
import './style.css';


function SearchAppBar() {
  const {userState} = useContext(UserContext);
  const { user, userSignOut } = userState;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSignOut = () => {
    handleClose();
    userSignOut();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

      <AppBar position="static" className="AppBar">
        <Toolbar>

          <MoreVertIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          </MoreVertIcon>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {user ?
              <div>
                <Link to="/home">
                  <MenuItem onClick={handleClose} >Home</MenuItem>
                </Link>

                <Link to="/profile">
                  <MenuItem onClick={handleClose} >Profile</MenuItem>
                </Link>

                <Link to="/publicHome">
                  <MenuItem onClick={handleCloseSignOut} >Logout</MenuItem>
                </Link>
              </div>
              :
              <div>
                 <Link to="/login">
                  <MenuItem onClick={handleClose} >Log In</MenuItem>
                </Link>

                <Link to="/signup">
                  <MenuItem onClick={handleClose} >Sign Up</MenuItem>
                </Link>
              </div>
            }
          </Menu>
          <Typography className="title" variant="h6" noWrap>
            <a href="/" style={{ textDecoration: 'none', color: 'white', }}> PlayDatery </a>
          </Typography>

        </Toolbar>
      </AppBar>

  );
}

export default SearchAppBar;