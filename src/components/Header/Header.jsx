import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useHeaderStore from "../../store/useHeaderStore";
import styles from "./header.module.scss";

const Header = () => {
  const location = useLocation();
  const { headerShow, setHeaderShow } = useHeaderStore();
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeMenu2, setActiveMenu2] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(true);
  const menuRef = useRef(null);
  const navigate = useNavigate()

  // 메뉴 클릭 시 활성화 상태 변경
  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const toggleMenu2 = (menuName) => {
    setActiveMenu2(activeMenu2 === menuName ? null : menuName);
  };

  const getLogoName = () => {
    const pathSegments = location.pathname.split("/");
    const secondPath = pathSegments[2];

    if (location.pathname.startsWith("/power")) {
      return "POWER";
    } else if (location.pathname.startsWith("/pilot")) {
      return "PILOT ADMIN";
    } else if (secondPath === "power") {
      return "POWER";
    } else if (secondPath === "pilot") {
      return "PILOT ADMIN";
    }
  };

  const getAdditionalClass = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const firstPath = pathSegments[0];
    const mainPath = pathSegments[1] || "";
    const subPath = pathSegments[2] || "";

    if (firstPath === "power" || firstPath === "pilot") {
      if (mainPath) {
        return "";
      }
      return firstPath === "power"
        ? styles["wrap--power"]
        : styles["wrap--pilot"];
    }

    if (firstPath === "pub") {
      if (subPath) {
        return mainPath === "power"
          ? styles["wrap--subPower"]
          : styles["wrap--subPilot"];
      }
      return mainPath === "power"
        ? styles["wrap--power"]
        : styles["wrap--pilot"];
    }
    return "";
  };

  const getLogoutClass = () => {
    const pathSegments = location.pathname.split("/");
    const secondPath = pathSegments[2];
    if (location.pathname.startsWith("/power")) {
      return styles.user__logout__power;
    } else if (location.pathname.startsWith("/pilot")) {
      return styles.user__logout__pilot;
    } else if (secondPath === "power") {
      return styles.user__logout__power;
    } else if (secondPath === "pilot") {
      return styles.user__logout__pilot;
    }
  };

  const renderNavLinks = () => {
    return (
      <ul
        className={`${styles["menu__list"]} ${activeMenu ? styles["menu__list--active"] : ""
          }`}
      >
        <li className={styles["menu__item"]}>
          <div
            className={`${styles["menu__link"]} ${activeMenu === "general" ? styles["menu__link--active"] : ""
              }`}
            onClick={() => {
              toggleMenu("general")
              setShowSubMenu(true)

            }}
          >
            General
          </div>
        </li>
        <li className={styles["menu__item"]}>
          <div
            className={`${styles["menu__link"]} ${activeMenu === "step2" ? styles["menu__link--active"] : ""
              }`}
            onClick={() => {
              toggleMenu("step2")
              setShowSubMenu(true)
            }}
          >
            Step 2 setup
          </div>
        </li>
        <li className={styles["menu__item"]}>
          <div
            className={`${styles["menu__link"]} ${activeMenu === "step3" ? styles["menu__link--active"] : ""
              }`}
            onClick={() => {
              toggleMenu("step3")
              setShowSubMenu(true)
            }}
          >
            Step 3 setup
          </div>
        </li>
      </ul>
    );
  };

  const renderNavLinks2 = () => {
    return (
      <div
        className={styles["subMenu__box"]}
        style={activeMenu === null ? { display: "none" } : { display: "block" }}
        ref={menuRef}
      >
        <div
          className={styles["subMenu__inner"]}
          style={
            activeMenu === "general" ? { display: "flex" } : { display: "none" }
          }
        >
          <ul className={styles["subMenu__list"]}>
            <li className={styles["subMenu__item"]}>
              <div className={styles["subMenu__arrowText"]}>User setup</div>
              <ul className={styles["subMenu__subList"]}>
                <li className={styles["subMenu__subItem"]}>
                  <button className={styles["subMenu__subLink"]} onClick={() => {
                    navigate("/pilot/krUser/krUser")
                    setShowSubMenu(false)
                  }}>
                    KR User
                  </button>
                </li>
                <li className={styles["subMenu__subItem"]}>
                  <button className={styles["subMenu__subLink"]} onClick={() => {
                    navigate('/pilot/krpUser/krpUser')
                    setShowSubMenu(false)
                  }}>
                    KRP User</button>
                </li>
                <li className={styles["subMenu__subItem"]}>
                  <button className={styles["subMenu__subLink"]} onClick={() => {
                    navigate('/pilot/krpRegistrationEdit/krpRegistrationEdit')
                    setShowSubMenu(false)
                  }}>
                    KRP Registration
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          {/* <ul className={styles["subMenu__list"]}>
            <li className={styles["subMenu__item"]}>
              <div className={styles["subMenu__arrowText"]}>Statistics</div>
              <ul className={styles["subMenu__subList"]}>
                <li className={styles["subMenu__subItem"]}>
                  <Link className={styles["subMenu__subLink"]} to="/">
                    User​Log View​
                  </Link>
                </li>
              </ul>
            </li>
          </ul> */}
        </div>
        <div
          className={styles["subMenu__inner"]}
          style={
            activeMenu === "step2" ? { display: "flex" } : { display: "none" }
          }
        >
          <ul className={styles["subMenu__list"]}>
            <li className={styles["subMenu__item"]}>
              <div className={styles["subMenu__arrowText"]}>IMO & EU setup</div>
              <ul className={styles["subMenu__subList"]}>
                <li className={styles["subMenu__subItem"]}>
                  <button className={styles["subMenu__subLink"]} onClick={() => {
                    navigate('/pilot/imoEuSetup/pricesRate')
                    setShowSubMenu(false)
                  }}>
                    Prices & rate
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div
          className={styles["subMenu__inner"]}
          style={
            activeMenu === "step3" ? { display: "flex" } : { display: "none" }
          }
        >
          <ul className={styles["subMenu__list"]}>
            <li className={styles["subMenu__item"]}>
              <div className={styles["subMenu__arrowText"]}>IMO & EU setup</div>
              <ul className={styles["subMenu__subList"]}>
                <li className={styles["subMenu__subItem"]}>
                  <button className={styles["subMenu__subLink"]} onClick={() => {
                    navigate('/pilot/imoEuSetup/pricesRate')
                    setShowSubMenu(false)
                  }}>
                    Prices & rate
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <ul className={styles["subMenu__list"]}>
            <li className={styles["subMenu__item"]}>
              <div className={styles["subMenu__arrowText"]}>Target setup</div>
              <ul className={styles["subMenu__subList"]}>
                <li className={styles["subMenu__subItem"]}>
                  <button className={styles["subMenu__subLink"]} onClick={() => {
                    navigate('/pilot/targetSetup/imoTarget')
                    setShowSubMenu(false)
                  }}>
                    IMO Target
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <ul className={styles["subMenu__list"]}>
            <li className={styles["subMenu__item"]}>
              <div className={styles["subMenu__arrowText"]}>Fuel setup</div>
              <ul className={styles["subMenu__subList"]}>
                <li className={styles["subMenu__subItem"]}>
                  <button className={styles["subMenu__subLink"]} onClick={() => {
                    navigate('/pilot/optionSetup/fuelSpecPriceIMO')
                    setShowSubMenu(false)
                  }}>
                    Spec. & Prices
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <ul className={styles["subMenu__list"]}>
            <li className={styles["subMenu__item"]}>
              <div className={styles["subMenu__arrowText"]}>Option setup​</div>
              <ul className={styles["subMenu__subList"]}>
                {/* <li className={styles["subMenu__subItem"]}>
                  <button className={styles["subMenu__subLink"]} onClick={() => {
                    navigate('/pilot/OMSetup/OptionsList/OptionsList')
                    setShowSubMenu(false)
                  }}>
                    Options lists
                  </button>
                </li> */}
                <li className={styles["subMenu__subItem"]}>
                  <button className={styles["subMenu__subLink"]} onClick={() => {
                    navigate('/pilot/OMSetup/OptionDetails/OptionsDetails')
                    setShowSubMenu(false)
                  }}>
                    Option Details(GHG reduction / CAPEX / OPEX/Rates by Ship
                    types)
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <ul className={styles["subMenu__list"]}>
            <li className={styles["subMenu__item"]}>
              <div className={styles["subMenu__arrowText"]}>Pathway setup​</div>
              <ul className={styles["subMenu__subList"]}>
                <li className={styles["subMenu__subItem"]}>
                  <button className={styles["subMenu__subLink"]} onClick={() => {
                    navigate('/pilot/pathwaySetup/pathList')
                    setShowSubMenu(false)
                  }}>
                    Path orders
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  // 바깥 클릭 감지 이벤트
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null); // 메뉴 닫기
        setActiveMenu2(null); // 메뉴 닫기
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <>
      {headerShow && (
        <div className={styles["wrap"]}>
          <div
            className={`${styles["inner"]} ${activeMenu || activeMenu2 ? styles["inner--active"] : ""
              }`}
          >
            <div className={styles["logo"]}>
              <a className={styles["logo__link"]} href="#none">
                Admin
              </a>
            </div>
            <div className={styles["menu"]} ref={menuRef}>
              {renderNavLinks()}
            </div>
            <div className={styles["user"]}>
              <div className={styles["user__inner"]}>
                <div className={styles["user__name"]}>
                  정화식
                  <span className={styles["user__eng"]}>(Hwaseek Jung)</span>
                </div>
                <button
                  className={`${styles["user__logout"]} ${getLogoutClass()}`}
                  type="button"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
          {showSubMenu ?
            renderNavLinks2() : <></>
          }
        </div>
      )}
    </>
  );
};

export default Header;
