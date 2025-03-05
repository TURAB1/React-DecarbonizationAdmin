import React, { useEffect, useRef, useId } from "react";
import AUIGrid from "../../../../static/AUIGrid-React/AUIGridReact";
import axios from "axios";

const FuelSpecPriceBioGrid = () => {
  // 그리드 객체
  const myGrid = useRef();

  // 그리드 name
  const uid = useId();

  const mySelectList = [
    { value: "001", text: "Blending fuel" },
    { value: "002", text: "LFO" },
    { value: "003", text: "HFO" },
    { value: "004", text: "MGO" },
  ];

  const columnLayout = [
    {
      dataField: "fuelType",
      headerText: "Fuel Type",
      renderer: {
        // HTML 템플릿 렌더러 사용
        type: "TemplateRenderer",
      },
      // dataField 로 정의된 필드 값이 HTML 이라면 labelFunction 으로 처리할 필요 없음.
      labelFunction: (rowIndex, columnIndex, value, headerText, item) => {
        // HTML 템플릿 작성
        // if (!value) return "";
        let template = '<div class="my_div">';

        if (value === "None") {
          template += "";
          // '<span style="line-height:2em;">X</span>';
        } else {
          template += '<span class="my_div_code_span">' + value + "</span>";
          template += '<select class="select">';

          mySelectList.forEach((element) => {
            const code = element["value"];
            const text = element["text"];
            if (code === value) {
              template +=
                '<option value="' +
                code +
                '" selected="selected">' +
                text +
                "</option>";
            } else {
              template += '<option value="' + code + '">' + text + "</option>";
            }
          });
          template += "</select>";
        }
        template += "</div>";
        return template; // HTML 템플릿 반환..그대도 innerHTML 속성값으로 처리됨
      },
    },
    {
      dataField: "LCV",
      headerText: "LCV<br/>[MJ/g]",
    },
    {
      dataField: "ttw",
      headerText: "TtW (GHG)<br/>[gCO2eq/MJ]",
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
        fuelType: "",
        defYn: "0.037",
        lcv: "0",
        efCo2: "14.00",
      },
      {
        fuelType: "",
        defYn: "0.041",
        lcv: "3.206",
        efCo2: "91.37",
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
