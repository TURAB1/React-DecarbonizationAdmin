import React, { useState } from "react";
import styles from "./inputCalendar.module.scss";

const InputCalendar = ({
  size = "",
  placeholder = "YYYY-MM-DD",
  defaultValue = "",
  disabled = false,
  id,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue); // 상태 관리

  const handleChange = (event) => {
    setInputValue(event.target.value); // 입력값 업데이트
    if (onChange) {
      onChange(event); // 부모 컴포넌트로 입력값 전달
    }
  };

  return (
    <div className={styles["inputCalendar"]} style={{ width: size }}>
      <input
        id={id}
        type="date"
        className={styles["inputCalendar__input"]}
        disabled={disabled}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange} // 변경 이벤트 추가
      />
    </div>
  );
};

export default InputCalendar;
