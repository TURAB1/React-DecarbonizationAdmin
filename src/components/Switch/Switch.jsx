import React,{useState} from "react";
import styles from "./switch.module.scss";

const Switch = ({ defaultChecked = false, disabled = false, id, label }) => {
    const [isToggled, setIsToggled] = useState(defaultChecked);

    const handleToggle = () => {
        setIsToggled((prev) => !prev);
    };
    return (
        <div className={styles["switch"]}>
            <input
                id={id}
                type="checkbox"
                className={styles["switch__input"]}
                checked={isToggled}
                onChange={handleToggle}
                disabled={disabled}
            />
            <label htmlFor={id} className={styles["switch__label"]}>
                <span className={styles["switch__slider"]}></span>
            </label>
            {label && <span className={styles["switch__text"]}>{label}</span>}
        </div>
    );
};

export default Switch;
