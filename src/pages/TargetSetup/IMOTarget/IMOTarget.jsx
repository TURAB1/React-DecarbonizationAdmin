import React, { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "./IMOTargetLineChart";
import InputNum from "../../../components/InputNum/InputNum";
import Button from "../../../components/Button/Button";
import styles from "./IMOTarget.module.scss";

const IMOTarget = () => {
  const [lineData1, setLineData1] = useState({ categories: [], series: [] });
  const [inputValues, setInputValues] = useState(Array(10).fill("")); // 초기화 시 배열 길이를 10으로 설정

  const PUBLIC_URL = process.env.PUBLIC_URL;

  useEffect(() => {
    console.log("SampleDefault 마운트됨");
    getIMOTarget();
  }, []);

  const getIMOTarget = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      const response = await fetch(
        "https://mail.teamsplus.kr/cm/krs/setting/api/getIMOTarget",
        options
      );
      const data = await response.json();
      const parsedData = JSON.parse(data.result.message);

      if (parsedData.length > 0) {
        // 문자열을 숫자로 변환
        const categories = parsedData[0].BaseYear.map((year) =>
          parseFloat(year)
        );
        const series = parsedData[0].TargetPercent.map((rate) =>
          parseFloat(rate)
        );

        setLineData1({
          categories: categories,
          series: series,
        });
        setInputValues(series);
        console.log(parsedData);
      } else {
        console.error("Invalid data format:", parsedData);
      }
    } catch (error) {
      console.error("Error fetching LineChart data:", error);
    }
  };

  const handleClick = () => {
    const updatedSeries = lineData1.series.map((value, index) => {
      console.log("handleClick = " + index + " - " + value);
      if (inputValues[index] !== "") {
        return parseFloat(inputValues[index]) || 0;
      }
      return value;
    });

    setLineData1((prevData) => ({
      ...prevData,
      series: updatedSeries,
    }));
  };

  const saveClick = async () => {
    try {
      var param = {
        BaseYear: lineData1.categories.map((year) => year.toString()), // 문자열로 변환
        TargetPercent: lineData1.series.map((rate) => rate.toString()), // 문자열로 변환
        CreateDate: new Date().toISOString(),
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
        "https://mail.teamsplus.kr/cm/krs/setting/api/setIMOTarget",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          alert(data.result.message);
          getIMOTarget();
        });
    } catch (error) {
      console.error("Error fetching LineChart data:", error);
    }
  };

  const handleInputChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = Number(value);
    setInputValues(newValues);
  };

  return (
    <section className="subPage">
      <div className="titleBox titleBox--type1">
        <div className="title">IMO Target</div>
      </div>
      <div className={styles["box"]}>
        <div className={styles["box2"]}>
          {lineData1.categories &&
            lineData1.categories.length > 0 &&
            lineData1.categories.map((category, index) => (
              <div className={styles["item"]} key={index}>
                <div className={styles["tit"]}>{category}</div>
                <InputNum
                  placeholder=""
                  defaultValue={inputValues[index]}
                  onChange={(e) => handleInputChange(index, e)}
                />
                <div className={styles["percent"]}>%</div>
              </div>
            ))}
        </div>
        <div className={styles["chartBox"]}>
          <LineChart
            lineCategories={lineData1.categories}
            lineSeriesData={lineData1.series}
          />
        </div>
      </div>
      <div className={styles["btns"]}>
        <Button
          children="Redraw"
          variant="blue"
          size="medium"
          icon="upload"
          onClick={handleClick}
        />
        <Button
          children="Save"
          variant="blue"
          size="medium"
          icon="export"
          onClick={saveClick}
        />
      </div>
    </section>
  );
};

export default IMOTarget;
