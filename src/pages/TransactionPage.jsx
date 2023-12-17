import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_API_URL;
  const { type } = useParams();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();

  function registerNewTransaction(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const transaction = { amount, description };

    axios
      .post(`${serverUrl}/transaction/${tipo}`, transaction, {
        headers: {
          Authorization: token,
        },
      })
      .then((resp) => {
        navigate("/home");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo === "in" ? "entrada" : "saída"}</h1>
      <form onSubmit={registerNewTransaction}>
        <input
          data-test="registry-amount-input"
          placeholder="Valor"
          type="text"
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          data-test="registry-name-input"
          placeholder="Descrição"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button data-test="registry-save" type="submit">
          Salvar {tipo === "in" ? "entrada" : "saída"}
        </button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
