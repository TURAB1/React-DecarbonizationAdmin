import React, { useState, useEffect, useRef, useId } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import axios from "axios";
import Tabs from "../../../components/Tabs/Tabs";
import styles from "./FuelSpecPrice.module.scss";
import Grid from "./componentGrid/FuelSpecPriceBioGrid";
import Grid2 from "./componentGrid/FuelSpecPriceBioGrid2";

const FuelSpecPriceBio = () => {
  const [activeTab, setActiveTab] = useState(2);
  const navigate = useNavigate();

  const tabs = [{ label: "IMO" }, { label: "EU" }, { label: "Biofuel" }];

  // activeTab이 변경될 때 실행
  useEffect(() => {
    if (activeTab === 0) {
      navigate("/pilot/optionSetup/fuelSpecPriceIMO");
    } else if (activeTab === 1) {
      navigate("/pilot/optionSetup/fuelSpecPriceEU");
    }
  }, [activeTab, navigate]);

  const handleReset = () => {
    console.log("Factor reset clicked");
    // 여기에 리셋 로직 추가
  };

  const handleClick = () => {};

  return (
    <section className="subPage">
      <div className="titleBox titleBox--type1">
        <div className="title">Fuel Specification</div>
      </div>

      {/* 탭 버튼만 표시 */}
      <Tabs
        tabs={tabs}
        activeIndex={activeTab}
        onTabChange={setActiveTab}
        color="blue"
      />

      <div style={{ margin: "20px 0" }}>
        <Grid></Grid>
      </div>

      <div className={styles["buttonBox"]}>
        <Button
          children="SAVE"
          onClick={handleClick}
          variant="blue"
          size="medium"
        />
      </div>
      <div>
        <Grid2></Grid2>
      </div>
    </section>
  );
};

export default FuelSpecPriceBio;
