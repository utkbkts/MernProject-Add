import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useGetUserQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
const RegisterPage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  const { data } = useGetUserQuery();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Register successful!");
      navigate("/login");
    }
  }, [error, isSuccess]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const registerData = {
      name,
      email,
      password,
    };
    await register(registerData);
  };

  const onChangeUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        justifyContent: "center",
      }}
    >
      <Paper elevation={0}>
        <form onSubmit={submitHandler} className="form-login">
          <TextField
            id="standard-basic"
            label="Name"
            name="name"
            variant="standard"
            required
            value={name}
            onChange={onChangeUser}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            name="email"
            required
            value={email}
            onChange={onChangeUser}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            required
            value={password}
            onChange={onChangeUser}
          />
          <Button disabled={isLoading} type="submit" variant="contained">
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{ display: "flex", gap: "5px" }}
            variant="body1"
            component="body1"
          >
            Do you have an account?<Link to={"/login"}>Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
