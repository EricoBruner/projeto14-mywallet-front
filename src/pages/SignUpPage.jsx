import { Link, redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const serverUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  function signUp(e) {
    e.preventDefault();

    if (password != confirmPass) return alert("Passwords don't match!");

    const user = { password, name, email };

    axios
      .post(`${serverUrl}/signup`, user)
      .then((resp) => {
        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input
          data-test="name"
          placeholder="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          data-test="email"
          placeholder="E-mail"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          data-test="password"
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          data-test="conf-password"
          placeholder="Confirm the password"
          type="password"
          autoComplete="new-password"
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />
        <button data-test="sign-up-submit" type="submit">
          Register
        </button>
      </form>

      <Link>Already have an account? Get in now!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
