import React from 'react';
import styles from './button.module.scss';

const Button = ({ children, onClick, onMouseDown, type = 'button', variant = '', size = '', icon = '', disabled = false }) => {
    const btnClass = `${styles.btn} ${variant && styles[`btn--${variant}`]} ${size && styles[`btn--${size}`]} ${icon && styles[`btn--${icon}`]}`.trim();

    return (
        <button
            className={btnClass}
            onClick={onClick}
            onMouseDown={onMouseDown}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
