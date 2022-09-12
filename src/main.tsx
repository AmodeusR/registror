import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./contexts/data.context";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./components";
import { CookiesProvider } from "react-cookie";

import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <DataProvider>
          <Routes>
            <Route path="/inicio" element={<App />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);