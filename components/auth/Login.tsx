import { app } from "firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./Styles.module.css";
import { setCookie } from "cookies-next";
import { Button, CircularProgress, TextField } from "@mui/material";

function LoginForm() {
  const auth = getAuth(app);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (token) {
      router.push("/admin/");
    }
  }, []);

  const signUp = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response: any) => {
        console.log(response.user);
        sessionStorage.setItem("Token", response.user.accessToken);
        setCookie("Token", response.user.accessToken);
        sessionStorage.setItem("UserEmail", response.user.email);
        setCookie("UserEmail", response.user.email);
        router.push("/admin/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.code === "auth/wrong-password") {
          alert("Wrong password");
        } else if (err.code === "auth/user-not-found") {
          alert("User not found");
        } else {
          alert("Cannot login");
        }
      });
  };

  if (loading === true) {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <TextField
          placeholder="Email"
          className={styles.inputBox}
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          type="email"
        />
        <TextField
          label="Password"
          placeholder="Password"
          className={styles.inputBox}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type="password"
        />
        <Button
          variant="contained"
          onClick={signUp}
          sx={{
            backgroundColor: "secondary.main",
            "&:hover": {
              backgroundColor: "secondary.main",
            },
          }}
        >
          {loading === true ? (
            <CircularProgress
              size="1.5rem"
              sx={{
                color: "white",
              }}
            />
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
