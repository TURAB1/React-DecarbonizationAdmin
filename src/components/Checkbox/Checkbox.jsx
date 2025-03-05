import React, { useEffect, useState } from "react";
import styles from './checkbox.module.scss';

const CheckBox = ({ defaultChecked = false, disabled = false, id, label, name, checked, onChange }) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);

    useEffect(() => {
        setIsChecked(defaultChecked);
    }, [defaultChecked]);

    const handleChange = (event) => {
        setIsChecked(event.target.checked);
        if (onChange) {
            onChange(event); // 부모 컴포넌트의 상태 변경 함수 실행
        }
    };

    return (
        <div className={styles["checkbox"]}>
            <input
                id={id}
                type="checkbox"
                name={name}
                className={styles["checkbox__input"]}
                disabled={disabled}
                checked={checked ?? isChecked}
                onChange={handleChange}
            />
            <label htmlFor={id} className={styles["checkbox__label"]}>
                {label && <div className={styles["checkbox__text"]}>{label}</div>}
            </label>
        </div>
    );
};

export default CheckBox;
