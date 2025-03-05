import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import useHeaderStore from '../../store/useHeaderStore';
import styles from "./workSheet.module.scss";

const WorkSheet = () => {
  const { setHeaderShow } = useHeaderStore();

  // 배열 형태의 테이블 데이터
  const tableData = [
    {
      depth1: "파워",
      depth2: "",
      depth3: "",
      link: "/pub/power", // 링크 경로
    },
    {
      depth1: "파일럿",
      depth2: "",
      depth3: "",
      link: "/pub/pilot", // 링크 경로
    },
    {
      depth1: "컴포넌트",
      depth2: "",
      depth3: "",
      link: "/pub/test", // 링크 경로
    },
    {
      depth1: "리스트",
      depth2: "",
      depth3: "",
      link: "/pub/list", // 링크 경로
    },
    {
      depth1: "그래프01",
      depth2: "",
      depth3: "",
      link: "/pub/graphType1", // 링크 경로
    },
    {
      depth1: "그래프02",
      depth2: "",
      depth3: "",
      link: "/pub/graphType2", // 링크 경로
    },
    {
      depth1: "그래프03",
      depth2: "",
      depth3: "",
      link: "/pub/graphType3", // 링크 경로
    },
    {
      depth1: "export",
      depth2: "",
      depth3: "",
      link: "/pub/export", // 링크 경로
    },
    {
      depth1: "서브페이지",
      depth2: "",
      depth3: "",
      link: "/pub/pilot/subPage", // 링크 경로
    },
    {
      depth1: "모달샘플",
      depth2: "",
      depth3: "",
      link: "/pub/modalPage", // 링크 경로
    }
    
  ];

  useEffect(() => {
    setHeaderShow(false);
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
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.depth1}</td>
              <td>{row.depth2}</td>
              <td>{row.depth3}</td>
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
