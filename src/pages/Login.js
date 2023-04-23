import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db, auth, googleProvider, facebookProvider } from "../firebase-config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import {
  CssBaseline,
  Link,
  Box,
  Divider,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme();

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [resetInput, setResetInput] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const navigate = useNavigate();

  function showResetInput() {
    setResetInput(!resetInput);
  }

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.log(error.message);
    }
    navigate("/");
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (res) => {
        const registerName = res.user.displayName;
        const registerEmail = res.user.email;
        const registerImage = res.user.photoURL;
        const ref = doc(db, "users", res.user.uid);

        await setDoc(ref, {
          signInMethod: "Google",
          email: registerEmail,
          name: registerName,
          image: registerImage,
          routines: {},
          exercises: [],
          workoutsCount: 0,
          exercisesCount: 0,
          dateCreated: Timestamp.now().toDate().getTime(),
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
    navigate("/");
  };

  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then(async (res) => {
        const registerName = res.user.displayName;
        const registerEmail = res.user.email;
        const ref = doc(db, "users", res.user.uid);

        await setDoc(ref, {
          signInMethod: "Facebook",
          email: registerEmail,
          name: registerName,
          routines: {},
          exercises: [],
          workoutsCount: 0,
          exercisesCount: 0,
          dateCreated: Timestamp.now().toDate().getTime(),
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
    navigate("/");
  };

  // TODO: add alert
  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log(`reset email sent to ${email}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
    navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-192px)]">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Log in with exernal account
            </Typography>
            <Button
              onClick={signInWithGoogle}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#4285F4" }}
            >
              <svg
                className="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Continue with Google
            </Button>
            <Button
              onClick={signInWithFacebook}
              fullWidth
              variant="contained"
              sx={{ mb: 2, bgcolor: "#3b5998" }}
            >
              <svg
                className="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook-f"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                ></path>
              </svg>
              Continue Continue with Facebook
            </Button>
          </Box>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider>
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h2" variant="h5">
              Use email
            </Typography>
            <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={(event) => {
                  setLoginEmail(event.target.value);
                }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link onClick={showResetInput} href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {resetInput && (
                <>
                  <TextField
                    onChange={(event) => {
                      setResetEmail(event.target.value);
                    }}
                    margin="normal"
                    fullWidth
                    id="emailReset"
                    label="Account Email"
                    name="email reset"
                    autoComplete="email"
                    autoFocus
                  ></TextField>
                  <Button onClick={() => resetPassword(resetEmail)} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Send Reset Email
                  </Button>
                </>
              )}
            </Box>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            align="left"
            sx={{ mt: 8, mb: 4 }}
          >
            Privacy Policy: We will never share your data or spam you. Your data
            is only stored for authentication.
          </Typography>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Login