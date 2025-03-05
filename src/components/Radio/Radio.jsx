import React, { useState } from "react";
import styles from './radio.module.scss';

const Radio = ({ checked, disabled = false, id, label, name, onChange }) => {
    return (
        <div className={styles["radio"]}>
            <input
                id={id}
                type="radio"
                name={name}
                className={styles["radio__input"]}
                disabled={disabled}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id} className={styles["radio__label"]}>
                {label &&
                    <div className={styles["radio__text"]}>
                        {label}
                    </div>
                }
            </label>
        </div>
    );
};

export default Radio;
