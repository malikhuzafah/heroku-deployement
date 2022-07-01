import React from "react";
import { Link } from "react-router-dom";
// import { makeStyles } from '@mui/material/styles';
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import userService from "../services/UserService";

// const useStyles = makeStyles((theme) => ({
//     link: {
//         color: "black",
//         paddingRight: "1rem",
//     },
// }));

const TopMenu = () => {
  // const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          <Link to="/" style={{ padding: "10px", color: "white" }}>
            Home
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/products" style={{ padding: "10px", color: "white" }}>
            Products
          </Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/contactUs" style={{ padding: "10px", color: "white" }}>
            Contact us
          </Link>
        </Typography>
        {!userService.isLoggedIn() ? (
          <>
            <Typography variant="h6">
              <Link to="/login" style={{ padding: "10px", color: "white" }}>
                Login
              </Link>
            </Typography>
            <Typography variant="h6">
              <Link to="/register" style={{ padding: "10px", color: "white" }}>
                Register
              </Link>
            </Typography>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              userService.logout();
              window.location.reload();
            }}
          >
            Logout {userService.getLoggedInUser().name}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopMenu;
