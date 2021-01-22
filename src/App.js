import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import textFactory, { textFilter } from "react-bootstrap-table2-filter";
import dateFactory, { dateFilter } from "react-bootstrap-table2-filter";

const App = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPlayerData = async () => {
    try {
      const data = await axios.get(
        "https://nba-players.herokuapp.com/players-stats"
      );
      console.log(data);
      setPlayers(data.data);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };
  const columns = [
    { dataField: "name", text: "Player Name", sort: true },
    { dataField: "points_per_game", text: "Points Per Game", sort: true, filter: dateFilter() },
    { dataField: "games_played", text: "games_played", sort: true },
    { dataField: "assists_per_game", text: "assists_per_game", filter: textFilter() },
    { dataField: "minutes_per_game", text: "minutes_per_game" },
    { dataField: "turnovers_per_game", text: "turnovers_per_game" },
  ];


  useEffect(() => {
    getPlayerData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <BootstrapTable
          keyField="name"
          data={players}
          columns={columns}
          pagination={paginationFactory()}
          filter={textFactory()}
          filter={dateFactory()}
        />
      ) : (
          <ReactBootStrap.Spinner animation="border" />
        )}
    </div>
  );
};

export default App;
