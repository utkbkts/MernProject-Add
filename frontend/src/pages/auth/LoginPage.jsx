import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useGetUserQuery } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;
  const { data } = useGetUserQuery();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [login, { isLoading, error, isSuccess, data: LoginData }] =
    useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Login successful!");
      navigate("/");
    }
  }, [error, isSuccess]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };
    await login(loginData);
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
            label="Email"
            variant="standard"
            required
            name="email"
            value={email}
            onChange={onChangeUser}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            name="password"
            required
            value={password}
            onChange={onChangeUser}
          />
          <Button type="submit" disabled={isLoading} variant="contained">
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{ display: "flex", gap: "5px" }}
            variant="body1"
            component="body1"
          >
            Don't you have an account?<Link to={"/register"}>Register</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
