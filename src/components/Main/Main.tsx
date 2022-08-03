import UserCard from "../Cards/UserCard";
import VisitorCard from "../Cards/VisitorCard";
import HistoryCard from "../Cards/HistoryCard";
import DataContext from "../../contexts/data.context";
import { useContext } from "react";

import "./main.scss";

const Main = () => {
  // const { selected } = useContext(DataContext);
  
  return (
    <main className="main-section">
      <UserCard />
      <VisitorCard />
      <HistoryCard />
    </main>
  );
};

export default Main;
