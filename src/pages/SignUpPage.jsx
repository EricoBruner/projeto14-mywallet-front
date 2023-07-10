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

    if (password != confirmPass) return alert("Senhas não conferem!");

    const user = { password, name, email };

    axios
      .post(`${serverUrl}/cadastro`, user)
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
          placeholder="Nome"
          type="text"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link>Já tem uma conta? Entre agora!</Link>
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
