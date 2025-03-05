import React, { useEffect, useRef, useId, useState } from "react";
import AUIGrid from "static/AUIGrid-React/AUIGridReact";
import axios from "axios";
import Tabs from "components/Tabs/Tabs";
import InputNum from "components/InputNum/InputNum";
import Select from "components/Select/Select";
import Button from "components/Button/Button";
import styles from "./EmissionPrice.module.scss";
import EmissionPriceChart from "./EmissionPriceChart";

const EmissionPrice = () => {
  const [lineData1, setLineData1] = useState({ categories: [], series: [] });
  const [lineData2, setLineData2] = useState({ categories: [], series: [] });
  const [euaPrice, setEuaPrice] = useState("");
  const [imoLevy, setImoLevy] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const myGrid = useRef();
  const uid = useId();

  const handleSelctChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    { value: "lp", label: "Last price" },
    { value: "ya", label: "Year average" },
    { value: "cp", label: "Certain period" },
    { value: "ip", label: "Input" },
  ];

  const columnLayout = [
    {
      dataField: "Date",
      headerText: "Date",
      editable: false,
      labelFunction: function (rowIndex, columnIndex, value) {
        var myString = "";
        if (value) {
          myString = value.substr(0, 10);
        }
        return myString;
      },
    },
    { dataField: "LevyPrice", headerText: "IMO Levy (USD)", editable: true },
    { dataField: "EUAPrice", headerText: "EU EUA Price(EUR)", editable: true },
    {
      dataField: "ExchangeRate",
      headerText: "Exchange Rate (EUR -> USD)",
      editable: true,
    },
  ];

  const gridProps = {
    width: "100%",
    height: 480,
    editable: true,
    rowHeight: 42,
    headerHeight: 42,
    noDataMessage: "출력할 데이터가 없습니다.",
  };

  const saveClick = async () => {
    try {
      const grid = myGrid.current.getGridData()[0];

      // 값 검증
      const EUAPrice = parseFloat(grid.EUAPrice);
      const LevyPrice = parseFloat(grid.LevyPrice);
      const ExchangeRate = parseFloat(grid.ExchangeRate);

      if (isNaN(EUAPrice) || isNaN(LevyPrice) || isNaN(ExchangeRate)) {
        alert("모든 값을 올바른 숫자로 입력하세요.");
        return;
      }

      var param = JSON.stringify({
        EUAPrice: EUAPrice,
        LevyPrice: LevyPrice,
        ExchangeRate: ExchangeRate,
        CreateDate: new Date().toISOString(),
        CreateUser: "test",
      });

      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: param,
      };
      fetch(
        "https://mail.teamsplus.kr/cm/krs/setting/api/setPriceRate",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data.result.message);
          selectGridData();
        });
    } catch (error) {
      console.error("Error fetching LineChart data:", error);
    }
  };

  const handleClick = () => {
    alert("테스트");
  };

  useEffect(() => {
    setupGridEvents();
    selectGridData();

    const fetchLineData1 = async () => {
      try {
        const response = await axios.get(
          "http://teeput.synology.me:50000/api/line-data2"
        );
        setLineData1({
          categories: response.data.categories,
          series: response.data.series,
        });
      } catch (error) {
        console.error("Error fetching LineChart data:", error);
      }
    };

    const fetchLineData2 = async () => {
      try {
        const response = await axios.get(
          "http://teeput.synology.me:50000/api/line-data2"
        );
        setLineData2({
          categories: response.data.categories,
          series: response.data.series,
        });
      } catch (error) {
        console.error("Error fetching LineChart data:", error);
      }
    };

    fetchLineData1();
    fetchLineData2();

    return () => {
      console.log("SampleDefault 언마운트됨");
    };
  }, []);

  const setupGridEvents = () => {
    const grid = myGrid.current;
    window.globalVar = grid;
    grid.bind(["cellClick", "cellEditEnd"], (event) => {
      console.log(event.type);
    });
  };

  const selectGridData = async () => {
    const grid = myGrid.current;
    try {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      fetch(
        "https://mail.teamsplus.kr/cm/krs/setting/api/getPriceRate",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          var parseData = JSON.parse(data.result.message);
          if (parseData.length > 6) {
            parseData = parseData.slice(0, 6); // 7개만 보여주기
          }
          grid.showAjaxLoader();
          grid.setGridData(parseData);
          grid.removeAjaxLoader();
          grid.addRow({}, "first");
        });
    } catch (error) {
      console.error("Error fetching LineChart data:", error);
    }
  };

  const renderTable = (categories, series) => {
    if (!categories.length || !series.length) return null;
    return (
      <table className="horizontal-table">
        <thead>
          <tr>
            <th>Date</th>
            {categories.map((category, index) => (
              <th key={index}>{category}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {series.map((s, rowIndex) => (
            <tr key={rowIndex}>
              {" "}
              <td key={rowIndex}>TEXT</td>
              {categories.map((c, colIndex) => (
                <td key={colIndex}>{s.data[colIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div className={styles["box"]}>
        <div className={styles["box__inner"]}>
          <div className="grayBox">
            <div className="grayBox__line">
              <div className="grayBox__inner">
                <div className="grayBox__box">
                  <div className="grayBox__tit">EU Allowances Prices</div>
                  <Select
                    options={options}
                    value={selectedOption}
                    onChange={handleSelctChange}
                    size="150px"
                  />
                </div>
              </div>
              <div className="grayBox__btn">
                <Button
                  children="Export PDF"
                  onClick={handleClick}
                  variant="blue"
                  size="medium"
                  icon="export"
                />
              </div>
            </div>
          </div>
          {renderTable(lineData1.categories, lineData1.series)}
          <div className={styles["chartBox"]}>
            <EmissionPriceChart
              lineCategories={lineData1.categories}
              lineSeriesData={lineData1.series}
            />
          </div>
        </div>
        <div className={styles["box__inner"]}>
          <div className="grayBox">
            <div className="grayBox__line">
              <div className="grayBox__inner">
                <div className="grayBox__box">
                  <div className="grayBox__tit">EU Allowances Prices </div>
                  <Select
                    options={options}
                    value={selectedOption}
                    onChange={handleSelctChange}
                    size="150px"
                  />
                </div>
              </div>
              <div className="grayBox__btn">
                <Button
                  children="Export PDF"
                  onClick={handleClick}
                  variant="blue"
                  size="medium"
                  icon="export"
                />
              </div>
            </div>
          </div>
          {renderTable(lineData2.categories, lineData2.series)}
          <div className={styles["chartBox"]}>
            <EmissionPriceChart
              lineCategories={lineData2.categories}
              lineSeriesData={lineData2.series}
            />
          </div>
        </div>
      </div>

      <div className="grayBox" style={{ margin: "20px 0" }}>
        <div className="grayBox__line">
          <div className="grayBox__inner">
            <div style={{ marginRight: "20px" }}>
              <Select
                options={options}
                value={selectedOption}
                onChange={handleSelctChange}
                size="150px"
              />
            </div>
            <div className="grayBox__box">
              <div className="grayBox__tit">EUA Price(EUR)​</div>
              <InputNum
                placeholder=""
                size="160px"
                value={euaPrice}
                onChange={(value) => setEuaPrice(value)}
              />
            </div>
            <div className="grayBox__box">
              <div className="grayBox__tit">IMO Levy</div>
              <InputNum
                placeholder=""
                size="160px"
                value={imoLevy}
                onChange={(value) => setImoLevy(value)}
              />
            </div>
            <div className="grayBox__box">
              <div className="grayBox__tit">Exchange rate(1 EUR to USD)</div>
              <InputNum
                placeholder=""
                size="160px"
                value={exchangeRate}
                onChange={(value) => setExchangeRate(value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid__blue">
        <AUIGrid
          ref={myGrid}
          name={uid}
          columnLayout={columnLayout}
          gridProps={gridProps}
        />
      </div>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <Button
          children="Save"
          onClick={saveClick}
          variant="blue"
          size="medium"
          icon="Save"
        />
      </div>
    </>
  );
};

export default EmissionPrice;
