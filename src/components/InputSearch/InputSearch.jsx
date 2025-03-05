import React, { useState } from "react";
import styles from './inputSearch.module.scss';

const InputSearch = ({size="", placeholder = "", defaultValue = '', disabled = false }) => {
    const [inputValue, setInputValue] = useState(defaultValue); // 상태 관리

    const handleChange = (event) => {
        setInputValue(event.target.value); // 입력값 업데이트
    };

    return (
        <div className={styles["inputSearch"]} style={{width:size}}>
            <input 
                type="text" 
                className={styles["inputSearch__input"]} 
                disabled={disabled} 
                placeholder={placeholder} 
                value={inputValue} 
                onChange={handleChange} // 변경 이벤트 추가
            />
        </div>
    );
};

export default InputSearch;
