import React, { useEffect, useRef, useId } from "react";
import AUIGrid from "../../../../static/AUIGrid-React/AUIGridReact";
import axios from "axios";

const FuelSpecPriceBioGrid = ({ onRequestGridData, gridRef }) => {
  // 그리드 객체
  const myGrid = useRef();

  // 그리드 name
  const uid = useId();

  const columnLayout = [
    {
      dataField: "fuelClass",
      headerText: "Fuel Class",
      cellMerge: true,
      editable: false,
    },
    {
      dataField: "pathwayName",
      headerText: "Pathway name",
      cellMerge: true,
      editable: false,
    },
    {
      headerText: "LCV",
      children: [
        {
          headerText: "",
          children: [
            {
              dataField: "mug",
              headerText: "[MU/g]",
            },
          ],
        },
      ],
    },
    {
      headerText: "Well to Tank",
      children: [
        {
          headerText: "",
          children: [
            {
              dataField: "gco2eqMu",
              headerText: "[gCO2eq/MU]",
            },
          ],
        },
      ],
    },
    {
      headerText: "Tank to Wake",
      children: [
        {
          headerText: "Cf CO2",
          children: [
            {
              dataField: "gco2Gfuel",
              headerText: "[gCO2/gFuel]",
            },
          ],
        },
        {
          headerText: "Cf CH4",
          children: [
            {
              dataField: "gch4Gfuel",
              headerText: "[gCH4/gFuel]",
            },
          ],
        },
        {
          headerText: "Cf N20",
          children: [
            {
              dataField: "gN20Gfuel",
              headerText: "[gN20/gFuel]",
            },
          ],
        },
        {
          headerText: "CO2eq,TtW(slip 제외)",
          children: [
            {
              dataField: "gco2eqGfuel",
              headerText: "[gCO2eq/gFuel]",
              editable: false,
            },
          ],
        },
        {
          headerText: "C slip",
          children: [
            {
              dataField: "cSlip",
              headerText: "[%]",
            },
          ],
        },
        {
          headerText: "TtW",
          children: [
            {
              dataField: "ttwGco2eqMu",
              headerText: "[gCO2eq/MU]",
              editable: false,
            },
          ],
        },
        {
          headerText: "CO2eq, TtW(slip 포함)",
          children: [
            {
              dataField: "ttwGco2eqGfuel",
              headerText: "[gCO2eq/gFuel]",
              editable: false,
            },
          ],
        },
      ],
    },
    {
      headerText: "Well to Wake",
      children: [
        {
          headerText: "",
          children: [
            {
              dataField: "gco2eqMu",
              headerText: "[gCO2eq/MU]",
              editable: false,
            },
          ],
        },
      ],
    },
  ];

  // 그리드 속성 정의
  const gridProps = {
    width: "100%",
    height: 480,
    rowHeight: 42,
    headerHeight: 42,
    editable: true,
    rowHeight: 32,
    headerHeight: 32,
    showRowNumColumn: false,
    noDataMessage: "출력할 데이터가 없습니다.",
    enableCellMerge: true, // ✅ 셀 병합 활성화
    cellMergeRowSpan: true, // ✅ 행(Row) 병합 활성화
    mergeCells: ["fuelClass", "pathwayName"], // ✅ 병합할 컬럼 리스트 추가
  };

  useEffect(() => {
    console.log("SampleDefault 마운트됨");

    // 최초 마운팅 될 때 그리드 이벤트 세팅
    // setupGridEvents();

    // 최초 마운팅 될 때 그리드 데이터 조회시키기
    onRequestGridData();

    return () => {
      console.log("SampleDefault 언마운트됨");
    };
  }, [onRequestGridData]);

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
        ref={gridRef}
        name={uid}
        columnLayout={columnLayout}
        gridProps={gridProps}
      />
    </div>
  );
};

export default FuelSpecPriceBioGrid;
