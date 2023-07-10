import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./App.jsx";
import ResetStyle from "./style/ResetStyle";
import GlobalStyle from "./style/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PagesContainer>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`;
