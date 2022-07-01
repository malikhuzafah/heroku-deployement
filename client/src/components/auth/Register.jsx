import { TextField, Button } from "@mui/material";
import React from "react";
import userService from "../../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const [email, setEmail] = React.useState("usman@usman.com");
  const [name, setName] = React.useState("Usman");
  const [password, setPassword] = React.useState("usman");
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
      }}
    >
      <div style={{ width: "60%" }}>
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <TextField
          label="Name"
          variant="standard"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            userService
              .register(name, email, password)
              .then((data) => {
                console.log(data);
                navigate("/login");
              })
              .catch((err) => {
                console.log(err);
                toast.error(err.response.data, {
                  position: toast.POSITION.TOP_LEFT,
                });
              });
          }}
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
