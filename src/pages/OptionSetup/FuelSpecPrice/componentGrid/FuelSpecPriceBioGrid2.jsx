import React, { useEffect, useRef, useId } from "react";
import AUIGrid from "../../../../static/AUIGrid-React/AUIGridReact";
import axios from "axios";

const FuelSpecPriceBioGrid = () => {
  // 그리드 객체
  const myGrid = useRef();

  // 그리드 name
  const uid = useId();

  const columnLayout = [
    {
      dataField: "fuelType",
      headerText: "Fuel Type",
    },
    {
      dataField: "CII Carbon Factor",
      headerText: "CII Carbon Factor",
    },
    {
      dataField: "ttwOnlyco2",
      headerText: "TtW (only CO2)<br/>[gCO2eq/MJ]",
    },
    {
      dataField: "ttw",
      headerText: "TtW (CHG)<br/>[gCO2eq/MJ]",
    },
    {
      dataField: "wtw",
      headerText: "WtW<br/>[gCO2eq/MJ]",
    },
  ];

  // 그리드 속성 정의
  const gridProps = {
    width: "100%",
    rowHeight: 42,
    headerHeight: 42,
    showRowNumColumn: false,
    noDataMessage: "출력할 데이터가 없습니다.",
  };

  useEffect(() => {
    console.log("SampleDefault 마운트됨");

    // 최초 마운팅 될 때 그리드 이벤트 세팅
    // setupGridEvents();

    // 최초 마운팅 될 때 그리드 데이터 조회시키기
    requestGridData();

    return () => {
      console.log("SampleDefault 언마운트됨");
    };
  }, []);

  const requestGridData = () => {
    const grid = myGrid.current;

    const data = [
      {
        fuelType: "#Cust0",
        defYn: "2014-10-01",
        lcv: "Steve",
        efCo2: "USA",
        efCh4: "usa.png",
        efN20: "IPad Air",
        cslip: "Green",
        wtwEmission: 3,
        2024: 2024,
        2030: 2030,
        2050: 2050,
      },
      {
        fuelType: "#Cust0",
        defYn: "2014-10-01",
        lcv: "Steve",
        efCo2: "USA",
        efCh4: "usa.png",
        efN20: "IPad Air",
        cslip: "Green",
        wtwEmission: 3,
        2024: 2024,
        2030: 2030,
        2050: 2050,
      },
      {
        fuelType: "#Cust0",
        defYn: "2014-10-01",
        lcv: "Steve",
        efCo2: "USA",
        efCh4: "usa.png",
        efN20: "IPad Air",
        cslip: "Green",
        wtwEmission: 3,
        2024: 2024,
        2030: 2030,
        2050: 2050,
      },
    ];

    grid.showAjaxLoader();
    grid.setGridData(data);
    grid.removeAjaxLoader();
  };

  return (
    <div className="grid__borderSky">
      <AUIGrid
        ref={myGrid}
        name={uid}
        columnLayout={columnLayout}
        gridProps={gridProps}
      />
    </div>
  );
};

export default FuelSpecPriceBioGrid;
