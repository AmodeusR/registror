import { Header, Sidebar, Main } from "./components";


function App() {
  return (
    <div className="app">
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
