import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import textFactory, { textFilter } from "react-bootstrap-table2-filter";
import dateFactory, { dateFilter, selectFilter } from "react-bootstrap-table2-filter";

const App = () => {
  const [dailythirtyflashreport, setdailythirtyflashreport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectRow, setSelectRow] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
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
  const selectOptions = {
    0: "低圧",
    1: "高圧"
  };

  const columns = [
    { dataField: "infomationclassificationcode", text: "情報区分コード", sort: true },
    { dataField: "sendercode", filter: textFilter(),text: "送信者コード",  sort: true },
    { dataField: "sendername", text: "送信者名称", sort: true },
    { dataField: "receivercode", text: "受信者コード", filter: textFilter() },
    { dataField: "receivername", text: "受信者名称" },
    { dataField: "filecreatedate", text: "ファイル作成年月日" },
    { dataField: "filecreatetime", text: "ファイル作成時分" },
    { dataField: "createddate", text: "取得年月日", filter: dateFilter() },
    { dataField: "customerid", text: "需要家識別番号" },
    { dataField: "supplypointspecificnum", text: "供給地点特定番号", filter: textFilter() },
    { dataField: "customername", text: "需要家名" },
    { dataField: "managementnum", text: "管理番号", filter: textFilter() },
    {
      dataField: "voltageflg", text: "電圧区分", formatter: cell => selectOptions[cell],
      filter: selectFilter({
        options: selectOptions
      })
    },
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(row, 79809)
      setSelectRow(row);
      setShow(true);
    }
  };

  useEffect(() => {
    getdailythirtyflashreportData();
  }, []);

  return (
    <div className="App">
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <p>{(typeof(selectRow) === "object") && selectRow.sendername}</p> */}
          <p>8989</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary"onClick={handleClose}>Close</Button>
          <Button variant="primary">ok</Button>
        </Modal.Footer>
      </Modal>

      {loading ? (
        <BootstrapTable
          keyField="name"
          data={dailythirtyflashreport}
          columns={columns}
          pagination={paginationFactory()}
          filter={textFactory()}
          filter={dateFactory()}
          rowEvents={rowEvents}
        />
      ) : (
          <ReactBootStrap.Spinner animation="border" />
        )}
    </div>
  );
};

export default App;
