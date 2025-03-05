import React, { useState } from "react";
import styles from "./inputPassword.module.scss";

const InputPassword = ({
  size = "",
  placeholder = "",
  defaultValue = "",
  disabled = false,
  onChange,
  name = "",
  value = "",
  ref,
  type = "text"
}) => {
  const [inputValue, setInputValue] = useState(defaultValue); // 상태 관리

  const handleChange = (event) => {
    setInputValue(event.target.value); // 입력값 업데이트
    if (onChange) {
      onChange(event.target.value); // 부모 컴포넌트로 입력값 전달
    }
  };

  return (
    <div className={styles["inputText"]} style={{ width: size }}>
      <input
        ref={ref}
        type={type}
        className={styles["inputText__input"]}
        disabled={disabled}
        placeholder={placeholder}
        value={inputValue}
        name={name}
        onChange={handleChange} // 변경 이벤트 추가
      />
    </div>
  );
};

export default InputPassword;
