import React, { useState, useEffect } from 'react';
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import useHeaderStore from '../../store/useHeaderStore';
import styles from "./export.module.scss";

const Export = () => {
    const { setHeaderShow } = useHeaderStore();

    // ✅ 모든 체크박스를 false로 초기화
    const initialCheckedState = {
        ChackBox1_All: false,
        ChackBox1_1: false,
        ChackBox1_2: false,
        ChackBox1_3: false,
        ChackBox1_4: false,
        ChackBox1_5: false,
        ChackBox1_6: false,
        ChackBox1_7: false,
        ChackBox1_8: false,
        ChackBox1_9: false,
        ChackBox1_10: false,
        ChackBox2_All: false,
        ChackBox2_1: false,
        ChackBox2_2: false,
    };

    const [checkedItems, setCheckedItems] = useState(initialCheckedState);

    // ✅ 전체 선택/해제 함수
    const handleAllChange = (name, checked) => {
        setCheckedItems(prevState => {
            const updatedState = { ...prevState };
            
            // 해당 name을 가진 모든 체크박스를 업데이트
            Object.keys(updatedState).forEach(key => {
                if (key.startsWith(name)) {
                    updatedState[key] = checked;
                }
            });

            return updatedState;
        });
    };

    // ✅ "ChackBox1_3" 선택 시 box__whiteBox 내 체크박스만 변경
    const handleSubgroupChange = (checked) => {
        setCheckedItems(prevState => {
            return {
                ...prevState,
                ChackBox1_3: checked,  // "ChackBox1_3" 상태 변경
                ChackBox1_4: checked,
                ChackBox1_5: checked,
                ChackBox1_6: checked,
                ChackBox1_7: checked,
                ChackBox1_8: checked,
                ChackBox1_9: checked,
                ChackBox1_10: checked,
            };
        });
    };

    // ✅ 개별 체크박스 상태 업데이트
    const handleCheckboxChange = (id, name, checked) => {
        setCheckedItems(prevState => {
            const updatedState = { ...prevState, [id]: checked };

             // ✅ "box__whiteBox" 내 체크박스 리스트
             const whiteBoxKeys = ["ChackBox1_4", "ChackBox1_5", "ChackBox1_6", "ChackBox1_7", "ChackBox1_8", "ChackBox1_9", "ChackBox1_10"];

             // ✅ "box__whiteBox" 내부 체크박스가 모두 선택되었는지 확인
             const isWhiteBoxAllChecked = whiteBoxKeys.every(key => updatedState[key]);
 
             // ✅ box__whiteBox가 모두 체크되면 "ChackBox1_3"도 체크됨
             updatedState["ChackBox1_3"] = isWhiteBoxAllChecked;

            // "ChackBox1_3"이 선택되었을 경우 box__whiteBox 내 체크박스만 변경
            if (id === "ChackBox1_3") {
                handleSubgroupChange(checked);
            }

            // 그룹 내 모든 체크박스가 체크되었는지 확인하여 "All" 체크박스 업데이트
            const groupKeys = Object.keys(updatedState).filter(key => key.startsWith(name) && key !== `${name}_All`);
            const isAllChecked = groupKeys.length > 0 && groupKeys.every(key => updatedState[key]);

            updatedState[`${name}_All`] = isAllChecked;

            return updatedState;
        });
    };

    useEffect(() => {
        setHeaderShow(false);
    }, [setHeaderShow]);

    return (
        <section className='sample'>
            <div className="titleBox titleBox--type1">
                <div className='title'>Export PDF</div>
            </div>

            <div className={styles["boxs"]}>
                {/* PLAN 1 */}
                <div className={styles["box"]}>
                    <div className={styles["box__tit"]}>PLAN 1</div>
                    <div className={styles["box__line"]}>
                        <div className={styles["box__check"]}>
                            <Checkbox
                                id="ChackBox1_All"
                                name="ChackBox1"
                                checked={checkedItems["ChackBox1_All"]}
                                onChange={(e) => handleAllChange("ChackBox1", e.target.checked)}
                                label="All"
                            />
                        </div>
                        <div className={styles["box__check"]}>
                            <Checkbox
                                id="ChackBox1_1"
                                name="ChackBox1"
                                checked={checkedItems["ChackBox1_1"]}
                                onChange={(e) => handleCheckboxChange("ChackBox1_1", "ChackBox1", e.target.checked)}
                                label="Ship info"
                            />
                        </div>
                        <div className={styles["box__check"]}>
                            <Checkbox
                                id="ChackBox1_2"
                                name="ChackBox1"
                                checked={checkedItems["ChackBox1_2"]}
                                onChange={(e) => handleCheckboxChange("ChackBox1_2", "ChackBox1", e.target.checked)}
                                label="User Company Target"
                            />
                        </div>
                        <div className={styles["box__check"]}>
                            <Checkbox
                                id="ChackBox1_3"
                                name="ChackBox1"
                                checked={checkedItems["ChackBox1_3"]}
                                onChange={(e) => handleCheckboxChange("ChackBox1_3", "ChackBox1", e.target.checked)}
                                label="Plan 1 Result"
                            />
                        </div>
                        <div className={styles["box__whiteBox"]}>
                            <div className={styles["box__check"]}>
                                <Checkbox id="ChackBox1_4" name="ChackBox1" checked={checkedItems["ChackBox1_4"]}
                                onChange={(e) => handleCheckboxChange("ChackBox1_4", "ChackBox1", e.target.checked)} label="대상 선박 현황 선택 데이터" />
                            </div>
                            <div className={styles["box__check"]}>
                                <Checkbox id="ChackBox1_5" name="ChackBox1" checked={checkedItems["ChackBox1_5"]}
                                onChange={(e) => handleCheckboxChange("ChackBox1_5", "ChackBox1", e.target.checked)} label="Ships GHG emission & CII Rating" />
                            </div>
                            <div className={styles["box__check"]}>
                                <Checkbox id="ChackBox1_6" name="ChackBox1" checked={checkedItems["ChackBox1_6"]}
                                onChange={(e) => handleCheckboxChange("ChackBox1_6", "ChackBox1", e.target.checked)} label="EUA Price" />
                            </div>
                            <div className={styles["box__check"]}>
                                <Checkbox id="ChackBox1_7" name="ChackBox1" checked={checkedItems["ChackBox1_7"]}
                                onChange={(e) => handleCheckboxChange("ChackBox1_7", "ChackBox1", e.target.checked)} label="Expected regulatory coat" />
                            </div>
                            <div className={styles["box__check"]}>
                                <Checkbox id="ChackBox1_8" name="ChackBox1" checked={checkedItems["ChackBox1_8"]}
                                onChange={(e) => handleCheckboxChange("ChackBox1_8", "ChackBox1", e.target.checked)} label="Ship Regulation cost" />
                            </div>
                            <div className={styles["box__check"]}>
                                <Checkbox id="ChackBox1_9" name="ChackBox1" checked={checkedItems["ChackBox1_9"]}
                                onChange={(e) => handleCheckboxChange("ChackBox1_9", "ChackBox1", e.target.checked)} label="Target GHG Reduction Amount" />
                            </div>
                            <div className={styles["box__check"]}>
                                <Checkbox id="ChackBox1_10" name="ChackBox1" checked={checkedItems["ChackBox1_10"]}
                                onChange={(e) => handleCheckboxChange("ChackBox1_10", "ChackBox1", e.target.checked)} label="Operational Analysis" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* PLAN 2 */}
                <div className={styles["box"]}>
                    <div className={styles["box__tit"]}>PLAN 2</div>
                    <div className={styles["box__line"]}>
                        <div className={styles["box__check"]}>
                            <Checkbox
                                id="ChackBox2_All"
                                name="ChackBox2"
                                checked={checkedItems["ChackBox2_All"]}
                                onChange={(e) => handleAllChange("ChackBox2", e.target.checked)}
                                label="All"
                            />
                        </div>
                        <div className={styles["box__check"]}>
                            <Checkbox
                                id="ChackBox2_1"
                                name="ChackBox2"
                                checked={checkedItems["ChackBox2_1"]}
                                onChange={(e) => handleCheckboxChange("ChackBox2_1", "ChackBox2", e.target.checked)}
                                label="Measure"
                            />
                        </div>
                        <div className={styles["box__check"]}>
                            <Checkbox
                                id="ChackBox2_2"
                                name="ChackBox2"
                                checked={checkedItems["ChackBox2_2"]}
                                onChange={(e) => handleCheckboxChange("ChackBox2_2", "ChackBox2", e.target.checked)}
                                label="Fuel Spec & Price"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 버튼 */}
            <div className={styles["btns"]}>
                <Button children="Upload Logo" variant="blue" size="medium" icon="upload" />
                <Button children="Export PDF" variant="blue" size="medium" icon="export" />
            </div>
        </section>
    );
};

export default Export;
