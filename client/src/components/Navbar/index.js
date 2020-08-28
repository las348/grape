import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from "react-router-dom";
import UserContext from "../../utils/userContext";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function SearchAppBar() {
  const {userState} = useContext(UserContext);
  const { user, userSignOut } = userState;
  const classes = useStyles();

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
    <div className={classes.root}>
      <AppBar position="static">
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

                <Link to="/login">
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
          <Typography className={classes.title} variant="h6" noWrap>
            <a href="/" style={{ textDecoration: 'none', color: 'white', }}> Play-datery </a>
          </Typography>

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default SearchAppBar;