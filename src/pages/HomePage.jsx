import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const navigate = useNavigate();
  const serverUrl = import.meta.env.VITE_API_URL;
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0.0);
  const user = localStorage.getItem("user");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${serverUrl}/transaction`, {
          headers: {
            Authorization: token,
          },
        })
        .then((resp) => {
          setTransactions(resp.data);
          let newBalance = 0;
          resp.data.forEach((t) => {
            if (t.type == "in") newBalance += t.amount;
            else newBalance -= t.amount;
          });
          setBalance(newBalance);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  }, [deleteTransaction]);

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  function deleteTransaction(id) {
    const resp = window.confirm("Deseja realmente excluir está transação?");
    if (!resp) return;

    const token = localStorage.getItem("token");

    axios
      .delete(`${serverUrl}/transaction/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((resp) => {})
      .catch((error) => {
        alert(error.response.data);
      });
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {user ? user : "Fulano"}!</h1>
        <ExitButton>
          <BiExit data-test="logout" onClick={() => logout()} />
        </ExitButton>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((t) => (
            <ListItemContainer key={t._id}>
              <div>
                <span>{t.date}</span>
                <strong data-test="registry-name">{t.description}</strong>
              </div>
              <div>
                <Value data-test="registry-amount" color={t.type}>
                  {t.amount.toFixed(2)}
                </Value>
                <DeleteButton
                  data-test="registry-delete"
                  onClick={() => deleteTransaction(t._id)}
                >
                  X
                </DeleteButton>
              </div>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value
            data-test="total-amount"
            color={balance >= 0 ? "entrada" : "saida"}
          >
            {balance.toFixed(2)}
          </Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <Link data-test="new-income" to="/nova-transacao/entrada">
          <Button>
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </Button>
        </Link>

        <Link data-test="new-expense" to="/nova-transacao/saida">
          <Button>
            <AiOutlineMinusCircle />
            <p>
              Nova <br />
              saída
            </p>
          </Button>
        </Link>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;

const ExitButton = styled.div`
  cursor: pointer;
  display: flex;
  svg {
    width: 30px;
    height: 30px;
  }
`;

const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  a {
    width: 100%;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 115px;
  font-size: 22px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    font-size: 18px;
  }
`;

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 9px;
  color: #000000;

  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }

  div {
    display: flex;
    align-items: center;
  }
`;

const DeleteButton = styled.button`
  width: 9px;
  height: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  cursor: pointer;
  display: flex;
  color: #c6c6c6;
  font-size: 11px;
`;
