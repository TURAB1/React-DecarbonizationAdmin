import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useHeaderStore from "../../store/useHeaderStore";
import styles from "./workSheet.module.scss";

const WorkSheet = () => {
  const { setHeaderShow } = useHeaderStore();

  // 배열 형태의 테이블 데이터
  const tableData = [
    {
      depth1: "General",
      depth2: "User setup",
      depth3: "KR User",
      link: "/pilot/krUser/krUser", // 링크 경로
      user: "크리스", // 담당자
    },
    {
      depth1: "General",
      depth2: "User setup",
      depth3: "KRP User",
      link: "/pilot/krpUser/krpUser", // 링크 경로
      user: "크리스", // 담당자
    },
    // {
    //   depth1: "General",
    //   depth2: "User setup",
    //   depth3: "KRP User List",
    //   link: "/pilot/krpUserList/krpUserList", // 링크 경로
    //   user: "크리스",      // 담당자
    // },
    {
      depth1: "General",
      depth2: "User setup",
      depth3: "KRP Registration",
      link: "/pilot/krpRegistrationEdit/krpRegistrationEdit", // 링크 경로
      user: "크리스", // 담당자
    },
    {
      depth1: "General",
      depth2: "Statistics",
      depth3: "User Log View",
      link: "#", // 링크 경로
      user: "김민영", // 담당자
    },
    {
      depth1: "Step 2 setup",
      depth2: "IMO & EU setup",
      depth3: "Prices & Rate",
      link: "/pilot/imoEuSetup/pricesRate", // 링크 경로
      user: "김민영", // 담당자
    },
    {
      depth1: "Step 3 setup",
      depth2: "Target setup",
      depth3: "IMO Target",
      link: "/pilot/targetSetup/imoTarget", // 링크 경로
      user: "김민영", // 담당자
    },
    // {
    //   depth1: "Step 3 setup",
    //   depth2: "Fuel setup",
    //   depth3: "Spec. & Prices",
    //   link: "/pilot/fuelSetup/specsPrices​", // 링크 경로
    //   user: "김민영", // 담당자
    // },
    {
      depth1: "Step 3 setup",
      depth2: "O & M setup",
      depth3: "Options List",
      link: "/pilot/OMSetup/OptionsList/OptionsList", // 링크 경로
      user: "크리스", // 담당자
    },
    {
      depth1: "Step 3 setup",
      depth2: "O & M setup",
      depth3: "Option Details",
      link: "/pilot/OMSetup/OptionDetails/OptionsDetails", // 링크 경로
      user: "크리스", // 담당자
    },
    {
      depth1: "Step 3 setup",
      depth2: "Pathway setup",
      depth3: "Path order",
      link: "/pilot/pathwaySetup/pathList", // 링크 경로
      user: "김민영", // 담당자
    },
    {
      depth1: "Step 3 setup",
      depth2: "Option setup",
      depth3: "fuelSpecPrice",
      link: "/pilot/optionSetup/fuelSpecPriceIMO", // 링크 경로
      user: "박대희", // 담당자
    },
    {
      depth1: "Step 3 setup",
      depth2: "Option setup",
      depth3: "Fuel & Emission",
      link: "/pilot/optionSetup/FuelEmissionPrice", // 링크 경로
      user: "박대희", // 담당자
    },
  ];

  useEffect(() => {
    setHeaderShow(false);
    return () => {
      setHeaderShow(true);
    };
  }, [setHeaderShow]);

  return (
    <section className={styles.WorkSheet}>
      <h1 className={styles.title}>WorkSheet</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>1depth</th>
            <th>2depth</th>
            <th>3depth</th>
            <th>페이지 이름</th>
            <th>담당자</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.depth1}</td>
              <td>{row.depth2}</td>
              <td>{row.depth3}</td>
              <td>{row.user}</td>
              <td>
                {/* 링크로 페이지 이름을 감싸기 */}
                <Link to={row.link} className={styles.link}>
                  바로가기
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default WorkSheet;
