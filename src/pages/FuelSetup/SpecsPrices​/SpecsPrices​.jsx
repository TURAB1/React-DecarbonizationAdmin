import React, { useEffect, useRef, useId, useState } from "react";
import AUIGrid from "../../../static/AUIGrid-React/AUIGridReact";
import Button from "../../../components/Button/Button";

const SpecsPrices = () => {
  // 그리드 객체
  const myGrid1 = useRef();
  const myGrid2 = useRef();

  // 그리드 name 에 정의할 고유값
  const uid1 = useId() + "1";
  const uid2 = useId() + "2";

  const PUBLIC_URL = process.env.PUBLIC_URL;

  var gridData = [
    {
      fuelType: "HFO",
      defaultUse: "N / Y",
      lcv: "",
      efCO2: "",
      efCH4: "",
      efN2O: "",
      cslip: "",
      wtwEmission: "",
      price2025: "",
      price2030: "",
      price2050: "",
    },
    {
      fuelType: "LNG",
      defaultUse: "N / Y",
      lcv: "",
      efCO2: "",
      efCH4: "",
      efN2O: "",
      cslip: "",
      wtwEmission: "",
      price2025: "",
      price2030: "",
      price2050: "",
    },
  ];

  var columnLayout = [
    { dataField: "fuelType", headerText: "Fuel type", width: 100 },
    { dataField: "defaultUse", headerText: "Default", width: 120 },
    {
      headerText: "Fuel spec.",
      children: [
        { dataField: "lcv", headerText: "LCV", width: 80 },
        { dataField: "efCO2", headerText: "EF (CO2)", width: 100 },
        { dataField: "efCH4", headerText: "EF (CH4)", width: 100 },
        { dataField: "efN2O", headerText: "EF (N2O)", width: 100 },
        { dataField: "cslip", headerText: "Cslip", width: 80 },
        { dataField: "wtwEmission", headerText: "WTW emission", width: 120 },
      ],
    },
    {
      headerText: "Fuel price",
      children: [
        { dataField: "price2025", headerText: "2025", width: 80 },
        { dataField: "price2030", headerText: "2030", width: 80 },
        { dataField: "price2050", headerText: "2050", width: 80 },
      ],
    },
  ];

  // 그리드 속성 정의
  const gridProps1 = {
    width: "100%",
    height: 300,
    editable: true,
    rowHeight: 32,
    headerHeight: 32,
    showRowCheckColumn: true,
    softRemoveRowMode: false,
    noDataMessage: "No Data",
  };

  // 그리드 속성 정의
  const gridProps2 = {
    width: "100%",
    height: 300,
    rowHeight: 32,
    headerHeight: 32,
    noDataMessage: "No Data",
  };

  const handleClick = () => {
    alert("테스트");
  };

  const addBtn = () => {
    const grid1 = myGrid1.current;
    grid1.addRow({}, "last");
  };

  const removeBtn = () => {
    const grid1 = myGrid1.current;
    const checkedItems = grid1.getCheckedRowItems();

    var ids = [];
    for (var i in checkedItems) {
      ids[i] = checkedItems[i].rowIndex;
    }
    grid1.removeRow(ids);
  };
  useEffect(() => {
    console.log("마운트됨.");

    // 최초 마운팅 될 때 그리드 이벤트 세팅
    setupGridEvents1();
    setupGridEvents2();

    // 최초 마운팅 될 때 그리드 데이터 조회시키기
    requestGridData1();
    requestGridData2();
    return () => {
      console.log("언마운트됨.");
    };
  }, []);

  // 그리드 이벤트 세팅
  const setupGridEvents1 = () => {
    const grid1 = myGrid1.current;
    //window.globalVar = grid;
    // 그리드 이벤트 바인딩
    grid1.bind(["cellClick", "selectionChange", "headerClick"], (event) => {
      console.log(event.type);
    });
  };

  const setupGridEvents2 = () => {
    const grid2 = myGrid2.current;
    //window.globalVar = grid;
    // 그리드 이벤트 바인딩
    grid2.bind(["cellClick", "selectionChange", "headerClick"], (event) => {
      console.log(event.type);
    });
  };

  // 그리드 데이터 조회하여 삽입
  const requestGridData1 = () => {
    const grid1 = myGrid1.current;
    const data = [
      {
        date: "2014-10-01",
        usd: "Steve",
        eur: "USA",
        exchangeRate: "usa.png",
      },
      {
        date: "2014-09-30",
        usd: "Emma",
        eur: "Korea",
        exchangeRate: "korea.png",
      },
      {
        date: "2014-09-29",
        usd: "Emma",
        eur: "Japan",
        exchangeRate: "japan.png",
      },
      {
        date: "2014-09-28",
        usd: "Emma",
        eur: "UK",
        exchangeRate: "uk.png",
      },
    ];

    grid1.showAjaxLoader();
    grid1.setGridData(gridData);
    grid1.removeAjaxLoader();
  };

  // 그리드 데이터 조회하여 삽입
  const requestGridData2 = () => {
    const grid2 = myGrid2.current;
    const data = [
      {
        date: "2014-10-01",
        usd: "Steve",
        eur: "USA",
        exchangeRate: "usa.png",
      },
      {
        date: "2014-09-30",
        usd: "Emma",
        eur: "Korea",
        exchangeRate: "korea.png",
      },
      {
        date: "2014-09-29",
        usd: "Emma",
        eur: "Japan",
        exchangeRate: "japan.png",
      },
      {
        date: "2014-09-28",
        usd: "Emma",
        eur: "UK",
        exchangeRate: "uk.png",
      },
    ];

    grid2.showAjaxLoader();
    grid2.setGridData(gridData);
    grid2.removeAjaxLoader();
  };

  return (
    <section className="subPage">
      <div className="titleBox titleBox--type1">
        <div className="title">Specs. & Prices</div>
        <div>
          <Button
            children="Setting"
            onClick={handleClick}
            variant="lineBlue"
            size="medium"
            icon="Setting"
          />
          <Button
            children="Save"
            onClick={handleClick}
            variant="lineBlue"
            size="medium"
            icon="Save"
          />
          <Button
            children="+"
            onClick={addBtn}
            variant="lineBlue"
            size="medium"
            icon="+"
          />
          <Button
            children="-"
            onClick={removeBtn}
            variant="lineBlue"
            size="medium"
            icon="-"
          />
        </div>
      </div>

      <div className="grid__borderBlue">
        <AUIGrid
          ref={myGrid1}
          name={uid1}
          columnLayout={columnLayout}
          gridProps={gridProps1}
        />
      </div>
      <div className="grid__borderBlue" style={{ marginTop: "20px" }}>
        <AUIGrid
          ref={myGrid2}
          name={uid2}
          columnLayout={columnLayout}
          gridProps={gridProps2}
        />
      </div>
    </section>
  );
};

export default SpecsPrices;
