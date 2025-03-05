import React from "react";
import styles from "./tabs.module.scss";

const Tabs = ({ tabs, activeIndex, onTabChange, color = "blue" }) => {
    return (
        <div className={`${styles["tabs"]} ${styles["tabs--"+color]}`} >
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`${styles["tab"]} ${
                        activeIndex === index ? styles["active"] : ""
                    }`}
                    onClick={() => onTabChange(index)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
