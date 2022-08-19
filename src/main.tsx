import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./contexts/data.context";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./components";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/entrar" element={<Login />} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
