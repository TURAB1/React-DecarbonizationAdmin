import React, { useEffect, useRef, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import InputText from "../../../components/InputText/InputText";
import Modal from "../../../components/Modal/Modal";
import AUIGrid from "static/AUIGrid-React/AUIGridReact";

const initialData = [
  {
    optionList: "NEW CHG Reduction",
    children: [
      {
        optionList: "Bulk Carrier",
        operationalMeasure: "6%",
        fullBlasting: "",
        ecoPaint: "",
        ultrasonicAnti: "1%",
        pbcf: "",
        pss: "2%",
      },
      {
        optionList: "Gas Carrier",
        operationalMeasure: "6%",
        fullBlasting: "6%",
        ecoPaint: "",
        ultrasonicAnti: "",
        pbcf: "4.5%",
        pss: "",
      },
    ],
    operationalMeasure: "6%",
    fullBlasting: "6%",
    ecoPaint: "3%",
    ultrasonicAnti: "1%",
    pbcf: "4.5%",
    pss: "2%",
  },
  {
    optionList: "NEW CAPEX[USD]",
    operationalMeasure: "500,000",
    fullBlasting: "",
    ecoPaint: "",
    ultrasonicAnti: "600,000",
    pbcf: "1,000,000",
    pss: "",
  },
  {
    optionList: "NEW OPEX[USD/year]",
    operationalMeasure: "",
    fullBlasting: "1,000,000",
    ecoPaint: "500,000",
    ultrasonicAnti: "1%",
    pbcf: "",
    pss: "",
  },
];

const OptionsDetails = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(initialData);
  const [key, setKey] = useState(0); // 그리드를 다시 렌더링하기 위한 키
  const myGrid = useRef(null);
  const gridId = useId();

  const [optionVal, setOptionVal] = useState("");
  const [optionNameVal, setOptionNameVal] = useState("");
  const handleClick = () => {
    setIsModalOpen(true);
  };

  const [columnLayout, setColumnLayout] = useState([
    {
      dataField: "optionList",
      headerText: "Option List",
      width: 160,
      cellMerge: true,
    },
    {
      headerText: "Option1",
      children: [
        {
          headerText: "Operational Measure",
          children: [
            {
              headerText: "",
              dataField: "operationalMeasure",
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          headerText: "Full Blasting",
          children: [
            {
              headerText: "",
              dataField: "fullBlasting",
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          headerText: "ECO Paint",
          children: [
            {
              headerText: "",
              dataField: "ecoPaint",
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
      ],
    },
    {
      headerText: "Option2",
      children: [
        {
          headerText: "Ultrasonic Anti. Fouling(DBPI)",
          children: [
            {
              headerText: "",
              dataField: "ultrasonicAnti",
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
      ],
    },
    {
      headerText: "Option3",
      children: [
        {
          headerText: "PBCF",
          children: [
            {
              headerText: "",
              dataField: "pbcf",
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          headerText: "PSS",
          children: [
            {
              headerText: "",
              dataField: "pss",
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          headerText: "Hull Fin",
          children: [
            {
              headerText: "",
              dataField: "hullFin",
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          headerText: "Bow Ret.",
          children: [
            {
              dataField: "bowRet",
              headerText: "",
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          headerText: "Prop. Ret.",
          children: [
            {
              headerText: "",
              dataField: "propRet",
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          headerText: "Wind Cover",
          children: [
            {
              headerText: "",
              dataField: "windCover",
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          headerText: "EPLO",
          children: [
            {
              headerText: "",
              dataField: "eplo",
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
      ],
    },
    {
      headerText: "Option4",
      children: [
        {
          dataField: "sac",
          headerText: "SAC",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          dataField: "vfp",
          headerText: "VFD",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          dataField: "led",
          headerText: "LED",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          dataField: "microBoiler",
          headerText: "MICRO BOILER",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
      ],
    },
    {
      headerText: "Option5",
      children: [
        {
          dataField: "als",
          headerText: "ALS",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          dataField: "waps",
          headerText: "WAPS",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          dataField: "amp",
          headerText: "AMP",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
      ],
    },
    {
      headerText: "Option6",
      children: [
        {
          dataField: "bioDiesel",
          headerText: "Bio-Diesel(Drop-in)Blending",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
      ],
    },
    {
      headerText: "Option7",
      children: [
        {
          dataField: "lngDf",
          headerText: "LNG DF",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          dataField: "methanolDf",
          headerText: "Methanol DF",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
        {
          dataField: "AmmoniaDf",
          headerText: "Ammonia DF",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
      ],
    },
    {
      headerText: "Option8",
      children: [
        {
          dataField: "occs",
          headerText: "OCCS",
          children: [
            {
              headerRenderer: {
                type: "CheckBoxHeaderRenderer",
                dependentMode: true,
              },
            },
          ],
        },
      ],
    },
  ]);

  // 그리드 속성 정의
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
    if (myGrid.current) {
      requestGridData();
    }
  }, []);

  useEffect(() => {
    if (myGrid.current) {
      requestGridData(data);
    }
  }, [key]);

  const [cnt, setCnt] = useState(1);
  const addOption = () => {
    setCnt((prevCnt) => {
      const newCnt = prevCnt + 1;

      // 새로운 컬럼 추가
      const newColumn = {
        headerText: optionVal, // 사용자가 입력한 값 반영
        children: [
          {
            dataField: `newField${newCnt}`,
            headerText: optionNameVal, // 사용자가 입력한 값 반영
            width: 100,
            headerRenderer: {
              type: "CheckBoxHeaderRenderer",
              dependentMode: true,
            },
          },
        ],
      };

      setColumnLayout((prevLayout) => {
        const updatedLayout = [...prevLayout, newColumn];
        console.log("업데이트된 columnLayout:", updatedLayout);
        return updatedLayout;
      });

      setKey((prevKey) => prevKey + 1); // 그리드 리렌더링을 위해 key 변경

      // 새로운 데이터 필드 추가
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          [`newField${newCnt}`]: "New Value",
        }))
      );

      setOptionVal("");
      setOptionNameVal("");
      setIsModalOpen(false); // 모달 닫기
      return newCnt;
    });
  };

  const setupGridEvents = () => {};

  const requestGridData = (dd = null) => {
    if (dd && dd.length > 0) {
      myGrid.current.setGridData(dd);
    } else {
      const data = [
        {
          optionList: "CHG Reduction",
          operationalMeasure: "6%",
          fullBlasting: "6%",
          ecoPaint: "3%",
          ultrasonicAnti: "1%",
          pbcf: "4.5%",
          pss: "2%",
        },
        {
          optionList: "CAPEX[USD]",
          operationalMeasure: "500,000",
          fullBlasting: "",
          ecoPaint: "",
          ultrasonicAnti: "600,000",
          pbcf: "1,000,000",
          pss: "",
        },
        {
          optionList: "OPEX[USD/year]",
          operationalMeasure: "",
          fullBlasting: "1,000,000",
          ecoPaint: "500,000",
          ultrasonicAnti: "1%",
          pbcf: "",
          pss: "",
        },
      ];

      myGrid.current.setGridData(data);
    }
  };

  const fuelPriceGoPage = () => {
    navigate("/pilot/decarbStrat/custDecarbStr/optionSetup/fuelSpecPriceIMO");
  };

  const speedAnalyGoPage = () => {
    navigate("/pilot/decarbStrat/custDecarbStr/optionSetup/shipSpeedAnaly");
  };

  return (
    <section className="subPage">
      <div className="titleBox">
        <div className="title">Options Details</div>
        <div className="titleBox__btns">
          <Button
            children="Fuel Spec. & Price Setting"
            onClick={fuelPriceGoPage}
            variant="lineBlue"
            size="medium"
          />
          <Button
            children="Speed Analysis"
            onClick={speedAnalyGoPage}
            variant="lineBlue"
            size="medium"
          />
          <Button
            children="add Option"
            onClick={handleClick}
            variant="lineBlue"
            size="medium"
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={addOption}
        title="옵션추가"
        type="confirm"
        size={"800px"}
      >
        <table className="vertical-table">
          <colgroup>
            <col style={{ width: "160px" }}></col>
          </colgroup>
          <tbody>
            <tr>
              <th>Option</th>
              <td>
                <InputText
                  placeholder=""
                  value={optionVal}
                  onChange={(value) => {
                    setOptionVal(value);
                  }}
                  size="150px"
                />
              </td>
            </tr>
            <tr>
              <th>Option Name</th>
              <td>
                <InputText
                  placeholder=""
                  value={optionNameVal}
                  onChange={(value) => {
                    setOptionNameVal(value);
                  }}
                  size="150px"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
      <div className="grid__borderSky">
        <AUIGrid
          key={key} // 키를 변경하여 그리드를 다시 렌더링
          ref={myGrid}
          name={gridId + key}
          columnLayout={columnLayout}
          gridProps={gridProps}
        />
      </div>
    </section>
  );
};

export default OptionsDetails;
