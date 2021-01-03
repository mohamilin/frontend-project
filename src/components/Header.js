import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// imoirt redux
import { getLogoutAction } from "../redux/actions/authAction";

// import material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Badge,
  MenuItem,
  Menu,
  Popper,
  Grow,
  Paper, MenuList, ClickAwayListener
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  title2: {
    display: "none",
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();

  const showUser = useSelector((state) => state.authReducer.user);
  console.log("showuser", showUser);
  const [navbar, setNavbar] = useState({
    showModerator: false,
    showAdmin: false,
    showMember: true,
    currentUser: undefined,
  });
  console.log("showUser", showUser);
  useEffect(() => {
    if (showUser) {
      setNavbar({
        currentUser: showUser,
        showModerator: showUser.roles.includes("ROLE_MODERATOR"),
        showAdmin: showUser.roles.includes("ROLE_ADMIN"),
        showMember: showUser.roles.includes("ROLE_USER"),
      });
    }
    // eslint-disable-next-line
  }, [dispatch, showUser]);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleClick = () => {
    dispatch(getLogoutAction());
    localStorage.removeItem("token");
    history.push("/");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem onClick={handleClick}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // menu profile
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            PPTQ Assalam Riyadlul Jannah
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            {navbar.showModerator && showUser && (
              <Button component={Link} to="/mod" color="inherit">
                Piket
              </Button>
            )}
            {navbar.showAdmin && showUser && (
              <Button component={Link} to="/admin" color="inherit">
                Admin
              </Button>
            )}
            {showUser && (
              <Button component={Link} to="/user" color="inherit">
                Guru
              </Button>
            )}
            {!showUser ? (
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            ) : (
                <div>
                  <Button
                    ref={anchorRef}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                    variant="contained" color="secondary"
                    onClick={handleToggle}
                  >
                    {showUser.username}
                </Button>
                  <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose} >
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                              <MenuItem component={Link} to="/profile" >Profile</MenuItem>
                              <MenuItem onClick={handleClick} >Logout</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              )}

            {/* {localStorage.getItem("token") && (
             <IconButton
             edge="end"
             aria-label="account of current user"
             aria-controls={menuId}
             aria-haspopup="true"
             onClick={handleProfileMenuOpen}
             color="inherit"
           >
             <AccountCircle />
           </IconButton>
            */}
            {/* )} */}
          </div>
          <div className={classes.sectionMobile}>
            <p>Pondok Pesantren Tahfidzul Qur'an Assalam Riyadlul Jannah</p>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
