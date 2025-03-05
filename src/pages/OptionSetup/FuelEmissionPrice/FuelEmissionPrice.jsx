import React, { useEffect, useRef, useState } from "react";
import Tabs from "components/Tabs/Tabs";
import FuelPrice from "./component/FuelPrice";
import EmissionPrice from "./component/EmissionPrice";
import axios from "axios";

const FuelEmissionPrice = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [gridData, setGridData] = useState([]);

  const tabs = [{ label: "Fuel Price" }, { label: "Emission Price" }];

  return (
    <section className="subPage">
      <div className="titleBox">
        <div className="title">Fuel & Emission</div>
      </div>
      <Tabs
        tabs={tabs}
        activeIndex={activeTab}
        onTabChange={setActiveTab}
        color="blue"
      />
      {activeTab === 0 ? (
        <div style={{ margin: "20px 0 0 0" }}>
          <FuelPrice setGridData={setGridData} />
        </div>
      ) : (
        <div style={{ margin: "20px 0 0 0" }}>
          <EmissionPrice setGridData={setGridData} />
        </div>
      )}
    </section>
  );
};

export default FuelEmissionPrice;
