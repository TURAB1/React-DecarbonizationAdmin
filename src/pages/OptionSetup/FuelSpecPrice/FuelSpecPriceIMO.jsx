import React, { useState, useEffect, useRef, useId } from "react";
import { useNavigate } from "react-router-dom";
import Button from "components/Button/Button";
import Tabs from "components/Tabs/Tabs";
import styles from "./FuelSpecPrice.module.scss";
import InputNum from "components/InputNum/InputNum";
import AUIGrid from "static/AUIGrid-React/AUIGridReact";
import axios from "axios";

const FuelSpecPriceIMO = ({ isReport }) => {
  const tabs = [{ label: "IMO" }, { label: "EU" }];
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const gridRef = useRef();
  const uid = useId();

  const [GWP100CO2, setGwp100Co2] = useState(1);
  const [GWP100CH4, setGwp100Ch4] = useState(1);
  const [GWP100N2O, setGwp100N2o] = useState(1);

  // activeTab이 변경될 때 실행
  useEffect(() => {
    if (isReport) return;

    if (activeTab === 0) {
      navigate("/pilot/optionSetup/fuelSpecPriceIMO");
    } else if (activeTab === 1) {
      navigate("/pilot/optionSetup/fuelSpecPriceEU");
    } else if (activeTab === 2) {
      // navigate("/pilot/optionSetup/fuelSpecPriceBio");
    }
  }, [activeTab, isReport]);

  const columnLayout = [
    { dataField: "FuelClassCodeID", visible: false },
    { dataField: "SortOrder", visible: false },
    { dataField: "GWP100CO2", visible: false },
    { dataField: "GWP100CH4", visible: false },
    { dataField: "GWP100N2O", visible: false },
    // { dataField: "CreateUser", visible: false },
    {
      dataField: "FuelCodeID",
      headerText: "Fuel Class",
      cellMerge: true,
      editable: false,
    },
    {
      dataField: "FuelCodeValue",
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
              dataField: "LCV",
              headerText: "[MU/g]",
              // 소수점 5자리로 포맷팅
              cellFormat: (value) => {
                return value ? value.toFixed(5) : "0.00000";
              },
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
              dataField: "WelltoTank",
              headerText: "[gCO2eq/MU]",
              // 소수점 5자리로 포맷팅
              cellFormat: (value) => {
                return value ? value.toFixed(5) : "0.00000";
              },
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
              dataField: "CO2",
              headerText: "[gCO2/gFuel]",
              // 소수점 5자리로 포맷팅
              cellFormat: (value) => {
                return value ? value.toFixed(5) : "0.00000";
              },
            },
          ],
        },
        {
          headerText: "Cf CH4",
          children: [
            {
              dataField: "CH4",
              headerText: "[gCH4/gFuel]",
              // 소수점 5자리로 포맷팅
              cellFormat: (value) => {
                return value ? value.toFixed(5) : "0.00000";
              },
            },
          ],
        },
        {
          headerText: "Cf N2O",
          children: [
            {
              dataField: "N2O",
              headerText: "[gN2O/gFuel]",
              // 소수점 5자리로 포맷팅
              cellFormat: (value) => {
                return value ? value.toFixed(5) : "0.00000";
              },
            },
          ],
        },
        {
          headerText: "CO2eq,TtW(slip 제외)",
          children: [
            {
              dataField: "CO2eq",
              headerText: "[gCO2eq/gFuel]",
              editable: false,
              // 소수점 5자리로 포맷팅
              cellFormat: (value) => {
                return value ? value.toFixed(5) : "0.00000";
              },
            },
          ],
        },
        {
          headerText: "C slip",
          children: [
            {
              dataField: "Cslip",
              headerText: "[%]",
              // 소수점 5자리로 포맷팅
              cellFormat: (value) => {
                return value ? value.toFixed(5) : "0.00000";
              },
            },
          ],
        },
        {
          headerText: "TtW",
          children: [
            {
              dataField: "TtW",
              headerText: "[gCO2eq/MU]",
              editable: false,
              // 소수점 5자리로 포맷팅
              cellFormat: (value) => {
                return value ? value.toFixed(5) : "0.00000";
              },
            },
          ],
        },
        {
          headerText: "CO2eq, TtW(slip 포함)",
          children: [
            {
              dataField: "CO2eqslip",
              headerText: "[gCO2eq/gFuel]",
              editable: false,
              // 소수점 5자리로 포맷팅
              cellFormat: (value) => {
                return value ? value.toFixed(5) : "0.00000";
              },
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
              dataField: "WelltoWake",
              headerText: "[gCO2eq/MU]",
              editable: false,
              // 소수점 5자리로 포맷팅
              cellFormat: (value) => {
                return value ? value.toFixed(5) : "0.00000";
              },
            },
          ],
        },
      ],
    },
  ];

  // 그리드 속성 정의
  const gridProps = {
    width: "100%",
    rowHeight: 42,
    headerHeight: 42,
    editable: true,
    showRowNumColumn: false,
    noDataMessage: "출력할 데이터가 없습니다.",
    enableCellMerge: true, // ✅ 셀 병합 활성화
    cellMergeRowSpan: true, // ✅ 행(Row) 병합 활성화
    mergeCells: ["fuelClass", "pathwayName"], // ✅ 병합할 컬럼 리스트 추가
  };

  useEffect(() => {
    requestGridData();

    // 그리드 컬럼 수정시 이벤트 함수수
    const checkGridRef = () => {
      if (gridRef.current) {
        gridRef.current.bind(["cellEditEnd"], (event) => {
          const { rowIndex, dataField, value } = event;
          const factor = Math.pow(10, 5);

          // CO2eq 계산식
          event.item.CO2eq =
            Math.floor(
              (event.item.CO2 * GWP100CO2 +
                event.item.CH4 * GWP100CH4 +
                event.item.N2O * GWP100N2O) *
                factor
            ) / factor;
          // TtW 계산식
          event.item.TtW =
            Math.floor(
              (((1 - event.item.Cslip / 100) * event.item.CO2 +
                (event.item.Cslip / 100) * GWP100CH4) /
                event.item.LCV) *
                factor
            ) / factor;
          // CO2eqslip 계산식
          event.item.CO2eqslip =
            Math.floor(event.item.TtW * event.item.LCV * factor) / factor;
          // WelltoWake 계산식
          event.item.WelltoWake =
            Math.floor((event.item.WelltoTank + event.item.TtW) * factor) /
            factor;
          // 새로 연산된 값을 그리드에 업데이트
          const updatedData = gridRef.current.getGridData();
          updatedData[rowIndex] = event.item;
          gridRef.current.setGridData(updatedData);
        });
      } else {
        setTimeout(checkGridRef, 100);
      }
    };
    checkGridRef();
  }, []);

  // 그리드 조회
  const requestGridData = async () => {
    const grid = gridRef.current;

    try {
      const response = await axios.get(
        "https://mail.teamsplus.kr/cm/krs/setting/api/GetFuelSpec?SearchType=1"
      );

      const data = JSON.parse(response.data.result.message);

      setGwp100Co2(data[0].GWP100CO2);
      setGwp100Ch4(data[0].GWP100CH4);
      setGwp100N2o(data[0].GWP100N2O);

      const factor = Math.pow(10, 5);

      const updatedData = data.map((item) => ({
        ...item,
        CO2eq:
          Math.floor(
            (item.CO2 * GWP100CO2 +
              item.CH4 * GWP100CH4 +
              item.N2O * GWP100N2O) *
              factor
          ) / factor,

        // TtW 계산식
        TtW:
          Math.floor(
            (((1 - item.Cslip / 100) * item.CO2 +
              (item.Cslip / 100) * GWP100CH4) /
              item.LCV) *
              factor
          ) / factor,

        // CO2eqslip 계산식
        CO2eqslip: Math.floor(item.TtW * item.LCV * factor) / factor,

        // WelltoWake 계산식
        WelltoWake: Math.floor((item.WelltoTank + item.TtW) * factor) / factor,

        CreateUser: "test",
      }));

      grid.showAjaxLoader();
      grid.setGridData(updatedData);
      grid.removeAjaxLoader();
    } catch (error) {
      console.error("Error", error);
    }
  };

  // 그리드 저장
  const gridSave = async () => {
    if (window.confirm("저장하시겠습니가?")) {
      const GridData = gridRef.current.getGridData();

      try {
        var param = {
          FuelSpec: GridData,
          SetupType: activeTab === 0 ? 1 : 2,
          GWP100CO2: GWP100CO2,
          GWP100CH4: GWP100CH4,
          GWP100N2O: GWP100N2O,
          CreateUser: "test",
        };
        console.log(param);

        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(param),
        };
        fetch(
          "https://mail.teamsplus.kr/cm/krs/setting/api/AddFuelSpec",
          options
        )
          .then((response) => response.json())
          .then((data) => {
            alert(data.result.message);
            // getIMOTarget();
          });
      } catch (error) {
        console.error("Error fetching LineChart data:", error);
      }
    }
  };

  // GWP100 입력시 그리드 재연산산
  const updateGrid = () => {
    const GridData = gridRef.current.getGridData();
    const factor = Math.pow(10, 5);

    for (var i = 0; i < GridData.length; i++) {
      GridData[i].CO2eq =
        Math.floor(
          (GridData[i].CO2 * GWP100CO2 +
            GridData[i].CH4 * GWP100CH4 +
            GridData[i].N2O * GWP100N2O) *
            factor
        ) / factor;

      GridData[i].TtW =
        Math.floor(
          (((1 - GridData[i].Cslip / 100) * GridData[i].CO2 +
            (GridData[i].Cslip / 100) * GWP100CH4) /
            GridData[i].LCV) *
            factor
        ) / factor;

      GridData[i].CO2eqslip =
        Math.floor(GridData[i].TtW * GridData[i].LCV * factor) / factor;

      GridData[i].WelltoWake =
        Math.floor((GridData[i].WelltoTank + GridData[i].TtW) * factor) /
        factor;
    }
    gridRef.current.setGridData(GridData);
  };

  // 그리드 초기화
  const gridReset = () => {
    requestGridData();
  };

  return (
    <section className="subPage">
      <div className="titleBox">
        <div className="title">Fuel Specification IMO</div>
        <div>
          <Button
            children="Factor reset"
            onClick={gridReset}
            variant="lineBlue"
            size="medium"
          />
          <Button
            children="Save"
            onClick={gridSave}
            variant="lineBlue"
            size="medium"
          />
        </div>
      </div>

      {/* 탭 버튼만 표시 */}
      <Tabs
        tabs={tabs}
        activeIndex={activeTab}
        onTabChange={setActiveTab}
        color="blue"
      />
      <div className={styles["tableBox"]} style={{ marginTop: "20px" }}>
        <table className="horizontal-table3" style={{ width: "400px" }}>
          <colgroup>
            <col style={{ width: "100px" }} />
            <col style={{ width: "100px" }} />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={2}>GWP100 - Delegated Regulation (EU) 2020/1044</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CO₂</td>
              <td>
                <InputNum
                  size="100%"
                  value={GWP100CO2}
                  onChange={(value) => {
                    setGwp100Co2(value);
                    updateGrid();
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>CH⁴</td>
              <td>
                <InputNum
                  size="100%"
                  value={GWP100CH4}
                  onChange={(value) => {
                    setGwp100Ch4(value);
                    updateGrid();
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>N₂O</td>
              <td>
                <InputNum
                  size="100%"
                  value={GWP100N2O}
                  onChange={(value) => {
                    setGwp100N2o(value);
                    updateGrid();
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid__borderSky" style={{ marginTop: "20px" }}>
        <AUIGrid
          ref={gridRef}
          name={uid}
          columnLayout={columnLayout}
          gridProps={gridProps}
        />
      </div>
    </section>
  );
};

export default FuelSpecPriceIMO;
