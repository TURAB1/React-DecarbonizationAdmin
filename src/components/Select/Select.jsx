import React from "react";
import styles from "./select.module.scss";

const Select = ({ size, options, value, onChange, disabled = false, placeholder}) => {
    
    const handleChange = (event) => {
        onChange(event); 
        event.target.blur(); // ✅ 강제로 포커스 해제
    };

    return (
        <div className={styles["select-container"]} style={{width:size}}>
            <select
                className={styles["select"]}
                value={value}
                onChange={handleChange}
                disabled={disabled}
            >
                {placeholder && (
                    <option value="" disabled>{placeholder}</option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
