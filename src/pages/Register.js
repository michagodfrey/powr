import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, googleProvider, facebookProvider } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import {
  Button,
  CssBaseline,
  TextField,
  Divider,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme();

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    try {
      if (registerPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
        .then(async (res) => {
          const ref = doc(db, "users", registerEmail);
          await setDoc(ref, {
            signInMethod: "Email and password",
            email: registerEmail,
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

  return (
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
              Sign up with email
            </Typography>
            <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={(event) => {
                      setRegisterEmail(event.target.value);
                    }}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(event) => {
                      setRegisterPassword(event.target.value);
                    }}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                    required
                    fullWidth
                    name="contfirm password"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
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
              Continue with external account
            </Typography>
            <Button
              onClick={signInWithGoogle}
              fullWidth
              variant="contained"
              sx={{ mb: 2, mt: 3, bgcolor: "#4285F4" }}
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
  );
};

export default Register;
