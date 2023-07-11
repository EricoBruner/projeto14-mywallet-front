import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import MyWalletLogo from "../components/MyWalletLogo";

export default function SignInPage() {
  const serverUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signIn(e) {
    e.preventDefault();

    const user = { email, password };

    axios
      .post(`${serverUrl}/`, user)
      .then((resp) => {
        const token = "Bearer " + resp.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", resp.data.user);
        navigate("/home");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input
          data-test="email"
          placeholder="E-mail"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          data-test="password"
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button data-test="sign-in-submit" type="submit">
          Entrar
        </button>
      </form>

      <Link to={"/cadastro"}>Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
