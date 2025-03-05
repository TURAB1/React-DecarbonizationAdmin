import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import axios from 'axios';

import PieChart from './CompontPower/PieChart';
import BarChart from './CompontPower/BarChart';
import LineChart from './CompontPower/LineChart';
import SmallPieChart from './CompontPower/SmallPieChart';

import styles from "./power.module.scss";
import profile from "../../assets/images/icon_profile.png";


const Power = () => {
  const [barData, setBarData] = useState({ categories: [], series: [] });
  const [lineData, setLineData] = useState({ categories: [], series: [] });
  const [pieData, setPieData] = useState([]);
  const [smallPieData, setSmallPieData] = useState([]);

  useEffect(() => {
    // BarChart 데이터 가져오기
    const fetchBarData = async () => {
      try {
        const response = await axios.get('http://teeput.synology.me:50000/api/bar-data'); // Bar 데이터 API 호출
        setBarData({
          categories: response.data.categories,
          series: response.data.series,
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching BarChart data:', error);
      }
    };

    // LineChart 데이터 가져오기
    const fetchLineData = async () => {
      try {
        const response = await axios.get('http://teeput.synology.me:50000/api/line-data'); // Line 데이터 API 호출
        setLineData({
          categories: response.data.categories,
          series: response.data.series,
        });
      } catch (error) {
        console.error('Error fetching LineChart data:', error);
      }
    };

    // PieChart 데이터 가져오기
    const fetchPieData = async () => {
      try {
        const response = await axios.get('http://teeput.synology.me:50000/api/pie-data'); // Pie 데이터 API 호출
        setPieData(response.data);
      } catch (error) {
        console.error('Error fetching PieChart data:', error);
      }
    };

    // 데이터 가져오기 실행
    fetchBarData();
    fetchLineData();
    fetchPieData();
  }, []);

  return (
    <>
      <section className={styles.power}>
        <div className={styles.visual}>
          <div className={styles.visual__inner}>
            <div className={styles.visual__bigtext}>Welcome to <span className={styles.visual__power}>POWER</span></div>
            <div className={styles.visual__text}>
              <span className={styles.visual__strong}>P</span>erformance evaluation for <span className={styles.visual__strong}>O</span>perational characteristics, <span className={styles.visual__strong}>W</span>eather & aging <span className={styles.visual__strong}>E</span>ffect and fuel consumption <span className={styles.visual__strong}> R</span>eview</div>
          </div>
        </div>
        <div className={styles.boxround}>
          <div className={styles.boxround__line}>
            <div className={styles.boxround__boxGreen}>
              <div className={styles.boxround__profile}>
                <div className={styles.boxround__img}>
                  <img src={profile} alt="profile" />
                </div>
                <div className={styles.boxround__wrap}>
                  <div className={styles.boxround__id}>BET_TEST</div>
                  <div className={styles.boxround__email}>lmo.dcs@krs.co.kr</div>
                </div>
              </div>
              <div className={styles.boxround__numbox}>
                <div className={styles.boxround__numbox_list}>
                  <div className={styles.boxround__numbox_item}>
                    <div className={styles.boxround__numbox_tit}>전화번호</div>
                    <div className={styles.boxround__numbox_text}>070-9999-9999</div>
                  </div>
                  <div className={styles.boxround__numbox_item}>
                    <div className={styles.boxround__numbox_tit}>직급</div>
                    <div className={styles.boxround__numbox_text}>Administrator (GEARs)</div>
                  </div>
                  <div className={styles.boxround__numbox_item}>
                    <div className={styles.boxround__numbox_tit}>회사</div>
                    <div className={styles.boxround__numbox_text}>Company Audit Status</div>
                  </div>
                </div>
                <div className={styles.boxround__numbox_right}>
                  <div className={styles.boxround__numbox_inner}>
                    <div className={styles.boxround__numbox_big}>99+<span> 건</span></div>
                    <div className={styles.boxround__numbox_black}>자신의 기록</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.boxround__box2}>
              <div className={styles.boxround__title}>Ship Informaion</div>
              <div className={styles.table}>
                <table className={styles.table__table}>
                  <colgroup>
                    <col style={{ width: "50px" }} />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                  </colgroup>
                  <thead className={styles.table__thead}>
                    <tr className={styles.table__thead_tr}>
                      <th className={styles.table__thead_th}>No.</th>
                      <th className={styles.table__thead_th}>IMO No.
                        <p>(+Class No.)</p></th>
                      <th className={styles.table__thead_th}>Ship name</th>
                      <th className={styles.table__thead_th}>Ship type</th>
                      <th className={styles.table__thead_th}>DWT</th>
                      <th className={styles.table__thead_th}>GT</th>
                      <th className={styles.table__thead_th}>Delivery year</th>
                      <th className={styles.table__thead_th}>AIS</th>
                      <th className={styles.table__thead_th}>DCS</th>
                    </tr>
                  </thead>
                  <tbody className={styles.table__tbody}>
                    <tr className={styles.table__tbody_tr}>
                      <td className={styles.table__tbody_td}>1</td>
                      <td className={styles.table__tbody_td}>XXXXXXX</td>
                      <td className={styles.table__tbody_td}>Ship A</td>
                      <td className={styles.table__tbody_td}>Bulk carrier</td>
                      <td className={styles.table__tbody_td}>XXXX</td>
                      <td className={styles.table__tbody_td}>XXXX</td>
                      <td className={styles.table__tbody_td}>2018</td>
                      <td className={styles.table__tbody_td}>Ｏ</td>
                      <td className={styles.table__tbody_td}>×</td>
                    </tr>
                    <tr className={styles.table__tbody_tr}>
                      <td className={styles.table__tbody_td}>2</td>
                      <td className={styles.table__tbody_td}>XXXXXXX</td>
                      <td className={styles.table__tbody_td}>Ship A</td>
                      <td className={styles.table__tbody_td}>Bulk carrier</td>
                      <td className={styles.table__tbody_td}>XXXX</td>
                      <td className={styles.table__tbody_td}>XXXX</td>
                      <td className={styles.table__tbody_td}>2018</td>
                      <td className={styles.table__tbody_td}>Ｏ</td>
                      <td className={styles.table__tbody_td}>×</td>
                    </tr>
                    <tr className={styles.table__tbody_tr}>
                      <td className={styles.table__tbody_td}>3</td>
                      <td className={styles.table__tbody_td}>XXXXXXX</td>
                      <td className={styles.table__tbody_td}>Ship A</td>
                      <td className={styles.table__tbody_td}>Bulk carrier</td>
                      <td className={styles.table__tbody_td}>XXXX</td>
                      <td className={styles.table__tbody_td}>XXXX</td>
                      <td className={styles.table__tbody_td}>2018</td>
                      <td className={styles.table__tbody_td}>Ｏ</td>
                      <td className={styles.table__tbody_td}>×</td>
                    </tr>
                    <tr className={styles.table__tbody_tr}>
                      <td className={styles.table__tbody_td}>4</td>
                      <td className={styles.table__tbody_td}>XXXXXXX</td>
                      <td className={styles.table__tbody_td}>Ship A</td>
                      <td className={styles.table__tbody_td}>Bulk carrier</td>
                      <td className={styles.table__tbody_td}>XXXX</td>
                      <td className={styles.table__tbody_td}>XXXX</td>
                      <td className={styles.table__tbody_td}>2018</td>
                      <td className={styles.table__tbody_td}>Ｏ</td>
                      <td className={styles.table__tbody_td}>×</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={styles.boxround__line}>
            <div className={styles.boxround__box}>
              <div className={styles.boxround__title}>보유 선종 현황</div>
              <PieChart data={pieData} radius="60%" />
            </div>
            <div className={styles.boxround__box2}>
              <div className={styles.boxround__title}>보유 선종 연령</div>
              <BarChart BarCategories={barData.categories} BarSeriesData={barData.series}></BarChart>
            </div>
          </div>
          <div className={styles.boxround__line}>
            <div className={styles.boxround__box}>
              <div className={styles.boxround__titlebox}>
                <div className={styles.boxround__titlebox_tit}>연도별 보유선종별 탄소배출 등급</div>
                <select className="select" style={{ width: "80px" }}>
                  <option>2023</option>
                  <option>2024</option>
                  <option>2025</option>
                  <option>2026</option>
                </select>
              </div>
              <div className={styles.boxround__chart}>
                <div className={styles.boxround__chart_tit}><span>2023</span> Vehicle Carrier (32ships)</div>
                <PieChart data={pieData} radius="60%" />
              </div>
              <div className={styles.boxround__small}>
                <SmallPieChart data={pieData} radius="60%" />
                <SmallPieChart data={pieData} radius="60%" />
                <SmallPieChart data={pieData} radius="60%" />
              </div>
            </div>
            <div className={styles.boxround__box2}>
              <div className={styles.boxround__title}>TBD</div>
              <LineChart lineCategories={lineData.categories} lineSeriesData={lineData.series}></LineChart>
            </div>
          </div>
        </div>
      </section>

      <Outlet /> {/* 서브 경로 렌더링 */}
    </>
  );
};

export default Power;
