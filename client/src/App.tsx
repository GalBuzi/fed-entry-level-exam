import React from "react";
import "./App.scss";
import TicketsComp from "./components/TicketsComp";
import SearchComp from "./components/SearchComp";
import PaginationComp from "./components/PaginationComp";

function App() {

  return (
    <div>
      <h1>Tickets List</h1>
      <SearchComp />
      <TicketsComp />
      <PaginationComp />
    </div>
  );
}

export default App;
