import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./contexts/data.context";
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
