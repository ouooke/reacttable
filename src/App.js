import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import textFactory, { textFilter } from "react-bootstrap-table2-filter";
import dateFactory, { dateFilter } from "react-bootstrap-table2-filter";

const App = () => {
  const [dailythirtyflashreport, setdailythirtyflashreport] = useState([]);
  const [loading, setLoading] = useState(false);
  const getdailythirtyflashreportData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:3000/dailythirtyflashreport"
      );
      console.log(data);
      setdailythirtyflashreport(data.data);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };
  const columns = [
    { dataField: "infomationclassificationcode", text: "情報区分コード", sort: true },
    { dataField: "sendercode", text: "送信者コード", filter: textFilter(), sort: true},
    { dataField: "sendername", text: "送信者名称", sort: true },
    { dataField: "receivercode", text: "受信者コード", filter: textFilter() },
    { dataField: "receivername", text: "受信者名称" },
    { dataField: "filecreatedate", text: "ファイル作成年月日" },
    { dataField: "filecreatetime", text: "ファイル作成時分" },
    { dataField: "createddate", text: "取得年月日", filter: dateFilter()  },
    { dataField: "supplypointspecificnum", text: "供給地点特定番号", filter: textFilter() },
    { dataField: "customerid", text: "需要家識別番号" },
    { dataField: "customername", text: "需要家名" },
    { dataField: "managementnum", text: "管理番号", filter: textFilter() },
    { dataField: "voltageflg", text: "電圧区分" },
  ];


  useEffect(() => {
    getdailythirtyflashreportData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <BootstrapTable
          keyField="name"
          data={dailythirtyflashreport}
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
