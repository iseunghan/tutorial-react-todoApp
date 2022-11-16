import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../modules/accounts";
import { goHome } from "../modules/todos";

function SignIn() {
  const initialValue = {username: "", password: ""};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error} = useSelector(state => state.accounts.account);
  const [signInRequest, setSignInReqeust] = React.useState(initialValue);

  useEffect(() => {
    if(!error) dispatch(goHome(navigate));
  }, []);

  const setUsername = (e) => {
    setSignInReqeust({
      ...signInRequest,
      username: e.target.value,
    });
  };
  const setPasword = (e) => {
    setSignInReqeust({
      ...signInRequest,
      password: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(signInRequest));
    setSignInReqeust(initialValue); // 초기화
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        {" "}
        {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="이메일 주소"
              name="email"
              autoComplete="email"
              onChange={setUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="패스워드"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={setPasword}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignIn;
