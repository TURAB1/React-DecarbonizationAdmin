import axios from "axios";
import React, { useState, useEffect, useRef, useId } from "react";
import { useNavigate } from "react-router-dom";
import AUIGrid from "static/AUIGrid-React/AUIGridReact";

const FuelEmissionPrceGrid = () => {
  // 그리드 객체
  const myGrid = useRef(null);
  const uid = useId();

  // const [activeTab, setActiveTab] = useState(0);
  const [gridData, setGridData] = useState([]);

  const tabs = [{ label: "Fuel Price" }, { label: "Emission Price" }];

  useEffect(() => {}, []);

  const columnLayout = [
    { dataField: "row", headerText: "행 레이블", cellMerge: true },
    { dataField: "angPrice", headerText: "Ang : Price(%/GJ)" },
    { dataField: "maxPrice", headerText: "Max : Price(%/GJ)" },
    { dataField: "minPrice", headerText: "Min : Price(%/GJ)" },
  ];

  const gridProps = {
    width: "100%",
    height: 480,
    rowHeight: 42,
    headerHeight: 42,
    showRowNumColumn: false,
    displayTreeOpen: true, // 트리 자동 오픈
    noDataMessage: "출력할 데이터가 없습니다.",
  };

  useEffect(() => {
    requestGridData();
  }, []);

  // 데이터 요청 함수
  const requestGridData = () => {
    const grid = myGrid.current;

    const data = [
      {
        row: "HFO",
        children: [
          {
            row: "HFO-1",
            angPrice: "angPrice-1",
            maxPrice: "maxPrice-1",
            minPrice: "minPrice-1",
          },
        ],
        angPrice: "angPrice",
        maxPrice: "maxPrice",
        minPrice: "minPrice",
      },
    ];

    grid.setGridData(data);
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

export default FuelEmissionPrceGrid;
