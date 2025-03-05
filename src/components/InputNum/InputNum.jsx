import React, { useState, useEffect } from "react";
import styles from "./inputNum.module.scss";

const InputNum = ({
  size = "",
  placeholder = "",
  defaultValue = "",
  disabled = false,
  value, // value prop 추가
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue); // 상태 관리

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setInputValue(event.target.value); // 입력값 업데이트
    if (onChange) {
      onChange(event.target.value); // 부모 컴포넌트의 상태 변경 함수 실행
    }
  };

  return (
    <div className={styles["inputNum"]} style={{ width: size }}>
      <input
        type="number"
        className={styles["inputNum__input"]}
        disabled={disabled}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange} // 변경 이벤트 추가
      />
    </div>
  );
};

export default InputNum;
